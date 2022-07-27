import * as Crypto from "crypto";

const algorithm = "aes-256-ctr";

/**
 * Hash the provided `value` using SHA512 hash
 *
 * @param value String to be hashed
 * @returns An SHA512 hash of the `value`
 */
export const hash = (value: string) => {
    return Crypto.createHash("SHA512").update(value).digest().toString("hex");
};

/**
 * Create an iterative hash `iterations` times over the `initialValue`
 *
 * @param initialValue Inital value to be hashed
 * @param iterations The number of times to hash the `initalValue`
 * @returns A string hash
 */
const iterateDigest = (initialValue: string, iterations = 3) => {
    let val = initialValue;
    for (let i = 0; i < iterations; i++) {
        val = hash(val);
    }
    return val;
};

/**
 * Create a secret key using a generated initialisation vector,
 *
 * @param iv A generated initialisation vector.
 * @param createdAt The time in milliseconds that the secret was created.
 * @param keyId The generated key of the secret (this is in the link shared to the user and stored as a hash in the database).
 * @param passphrase (Optional) Secure passphrase for added encryption.
 * @returns A hashed secret key string.
 */
const createSecretKey = (
    iv: Buffer,
    createdAt: number,
    keyId: string,
    passphrase?: string | null
) => {
    const gSecret = iterateDigest(process.env.GLOBAL_SECRET!);
    const ivHex = iv.toString("hex");
    return hash(
        `${gSecret}::${ivHex}::${createdAt}::${keyId}::${passphrase ?? ""}`
    );
};

/**
 * Calculate an interval (`n`) from the division of the `key` length and `maxLength`
 * then take every n'th value from the original `key` and return it.
 *
 * @param key The key to reduce.
 * @param maxLength The maximum length of the returning string.
 * @returns A reduced key.
 */
const reduceKey = (key: string, maxLength: number) => {
    const length = key.length;
    const interval = Math.floor(length / maxLength);
    if (interval === 0) return key;

    let str = "";
    for (let i = 0; i < length; i += interval) {
        str += key[i];
    }
    return str;
};

/**
 * Encrypt the given `value` with AES-256 encryption.
 *
 * @param value The string to be encrypted.
 * @param createdAt The time in milliseconds that the secret was created.
 * @param keyId The generated key of the secret (this is in the link shared to the user and stored as a hash in the database).
 * @param passphrase (Optional) Secure passphrase for added encryption.
 * @returns An AES-256 encrypted string & an initialisation vector.
 */
export const encryptValue = (
    value: string,
    createdAt: number,
    keyId: string,
    passphrase?: string | null
) => {
    const iv = Crypto.randomBytes(16);
    const secretKey = createSecretKey(iv, createdAt, keyId, passphrase);
    console.log(reduceKey(secretKey, 32));
    const cipher = Crypto.createCipheriv(
        algorithm,
        reduceKey(secretKey, 32),
        iv
    );
    const encryptedValue = Buffer.concat([
        cipher.update(value),
        cipher.final(),
    ]);
    return {
        iv: iv.toString("hex"),
        value: encryptedValue.toString("hex"),
    };
};

/**
 * Decrypt the `encryptedValue` and return it.
 *
 * @param encryptedValue An encrypted string in HEX format.
 * @param ivHex The initialisation vector string in HEX format.
 * @param keyId The generated key of the secret (this is in the link shared to the user and stored as a hash in the database).
 * @param createdAt The time in milliseconds that the secret was created.
 * @param passphrase (Optional) Secure passphrase for added encryption.
 * @returns A decrypted string
 */
export const decryptValue = (
    encryptedValue: string,
    ivHex: string, // hex
    keyId: string,
    createdAt: number,
    passphrase?: string
) => {
    const iv = Buffer.from(ivHex, "hex");
    const secretKey = createSecretKey(iv, createdAt, keyId, passphrase);
    console.log(reduceKey(secretKey, 32));
    const decipher = Crypto.createDecipheriv(
        algorithm,
        reduceKey(secretKey, 32),
        iv
    );
    const decrpyted = Buffer.concat([
        decipher.update(Buffer.from(encryptedValue, "hex")),
        decipher.final(),
    ]);
    return decrpyted.toString();
};

/**
 * Hash a password
 *
 * @param password Plaintext password to hash
 * @param oSalt (Optional) original salt
 * @returns
 */
export const hashPassword = (password: string, oSalt?: string) => {
    // Creating a unique salt for a particular user
    const salt = oSalt || Crypto.randomBytes(24).toString("hex");

    // Hashing user's salt and password with 1000 iterations,
    const hash = Crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(
        `hex`
    );

    return `${salt}:${hash}`;
};

/**
 * Hash a plaintext password and compare it's value with an existing
 * password hash.
 *
 * @param password Plaintext password to compare.
 * @param hash Existing password hash.
 * @returns Match status
 */
export const comparePassword = (password: string, hash: string) => {
    const [salt, pwdHash] = hash.split(":");
    if (!salt) {
        throw new Error("No salt");
    }
    if (!pwdHash) {
        throw new Error("No hash");
    }

    const pwd = hashPassword(password, salt);

    return pwd === hash;
};
