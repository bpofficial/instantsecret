import * as Crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import {
    comparePassword,
    decryptValue,
    hash,
} from "../../../../api/encryption";
import { getDynamodb } from "../../../../aws";

async function GetLink(req: NextApiRequest, res: NextApiResponse) {
    const { dynamodb, tableName } = getDynamodb();

    const rawId = req.query?.["id"] || "";

    if (typeof rawId !== "string") {
        return;
    }

    const id = decodeURIComponent(rawId);
    const viewedByCreator = req.query["creator"] === "true";
    const viewedByRecipient = req.query["recipient"] === "true";
    const rawPassphrase = req.query?.["passphrase"] || null;
    const passphrase = typeof rawPassphrase !== "string" ? null : rawPassphrase;

    if (!id) {
        res.statusCode = 404;
        res.end();
        return;
    }

    let record;
    let secureCreatorPackage = {};
    try {
        if (viewedByCreator) {
            record = await dynamodb
                .get({
                    TableName: tableName,
                    Key: {
                        id: hash(id).toString("hex"),
                    },
                })
                .promise();
            secureCreatorPackage = record.Item?.secure?.creatorEncryption ?? {};
        } else {
            // Need to scan since we're not using a primary key :sigh:
            // deepcode ignore NoSqli: ?
            record = await dynamodb
                .scan({
                    TableName: tableName,
                    FilterExpression: "secretId = :secretId",
                    ExpressionAttributeValues: {
                        ":secretId": hash(id).toString("hex"),
                    },
                })
                .promise();

            if (!record || record.$response.error || record.Count === 0) {
                res.statusCode = 404;
                res.end();
                return;
            }

            if (record && record.Count && record.Count > 1) {
                console.debug(
                    "More than 1 secret found with id",
                    hash(id).toString("hex")
                );
                res.statusCode = 404;
                res.end();
                return;
            }

            record = { Item: record.Items?.[0] ?? null };
        }
    } catch (err) {
        console.debug(err);
        record = {};
    }

    if (!record || !record.Item || (!viewedByCreator && record.Item.burntAt)) {
        res.statusCode = 404;
        res.end();
        return;
    }

    let canViewSecretValue = false;

    const passphraseMatch = record.Item.secure.passphrase
        ? comparePassword(
              passphrase?.toString() || "",
              record.Item.secure.passphrase
          )
        : true;

    if (
        (viewedByCreator &&
            !record.Item.viewedByCreatorAt &&
            !record.Item.secure.passphrase) ||
        (viewedByRecipient &&
            !record.Item.viewedByRecipientAt &&
            passphraseMatch)
    ) {
        canViewSecretValue = true;
        try {
            const update = await dynamodb
                .update({
                    TableName: tableName,
                    Key: {
                        id: record.Item.id,
                    },
                    UpdateExpression:
                        "SET #viewTimeProp = :viewedAt, secure = :secure",
                    ExpressionAttributeValues: {
                        ":viewedAt": new Date().toISOString(),
                        ":secure": viewedByCreator
                            ? {
                                  iv: record.Item.secure.iv,
                                  value: record.Item.secure.value,
                                  passphrase: record.Item.secure.passphrase,
                              }
                            : {},
                    },
                    ExpressionAttributeNames: {
                        "#viewTimeProp": viewedByCreator
                            ? "viewedByCreatorAt"
                            : "viewedByRecipientAt",
                    },
                })
                .promise();
            if (update.$response.error) {
                console.debug(update.$response);
                res.statusCode = 500;
                res.end();
                return;
            }
        } catch (err) {
            console.debug(err);
            res.statusCode = 500;
            res.end();
            return;
        }
    }

    // Passphrase didn't match
    if (
        viewedByRecipient &&
        !record.Item.viewedByRecipientAt &&
        !passphraseMatch
    ) {
        const attempts = (record.Item?.passwordAttempts ?? 0) + 1;
        const maxAttemptsReached = attempts >= 10;
        console.log(attempts);
        try {
            const update = await dynamodb
                .update({
                    TableName: tableName,
                    Key: {
                        id: record.Item.id,
                    },
                    UpdateExpression:
                        "SET passwordAttempts = :attempts, secure = :secure, burntAt = :burntAt",
                    ExpressionAttributeValues: {
                        ":attempts": attempts,
                        ":secure": maxAttemptsReached
                            ? {}
                            : record.Item?.secure ?? {},
                        ":burntAt": maxAttemptsReached
                            ? new Date().toISOString()
                            : null,
                    },
                })
                .promise();
            if (maxAttemptsReached) {
                console.debug("Too many attempts! Wiped");
                res.statusCode = 401;
                res.json({
                    code: 401,
                    error: "Unauthorized",
                    description:
                        "Too many incorrect attempts, this secure link has been destroyed.",
                    meta: {
                        fieldError: true,
                    },
                });
                return;
            }
            if (update.$response.error) {
                console.debug(update.$response);
                res.statusCode = 500;
                res.end();
                return;
            }
        } catch (err) {
            console.debug(err);
            res.statusCode = 500;
            res.end();
            return;
        }

        res.statusCode = 401;
        res.json({
            code: 401,
            error: "Unauthorized",
            description: "The passphrase didn't match.",
            meta: {
                fieldError: true,
            },
        });
        return;
    }

    let secret;
    try {
        if (canViewSecretValue) {
            const secure = viewedByCreator
                ? secureCreatorPackage
                : record.Item.secure;
            const createdAt = new Date(record.Item.createdAt).getTime();
            secret = decryptValue(
                secure.value,
                secure.iv,
                id,
                createdAt,
                passphrase
            );
        }
    } catch (err) {
        console.debug(err);
        res.statusCode = 500;
        res.end();
        return;
    }

    if (secret && secret.length !== record.Item.originalSize) {
        // bad decipher
        console.debug("Failed to properly decipher");
        res.statusCode = 500;
        res.end();
        return;
    }

    // deepcode ignore InsecureHash: Only shown to user, all safe
    const secretId = Crypto.createHash("md5")
        .update(id + record.Item.createdAt)
        .digest()
        .toString("hex");

    res.statusCode = 200;
    res.json({
        secretKey: viewedByCreator ? secretId : id,
        value: secret ? secret : null,
        ttl: record.Item.ttl,
        encrypted: !!record.Item.secure.passphrase,
        burntAt: record.Item.burntAt,
        createdAt: record.Item.createdAt,
        viewedByCreatorAt: record.Item.viewedByCreatorAt,
        viewedByRecipientAt: record.Item.viewedByRecipientAt,
    });
}

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        return GetLink(req, res);
    } else {
        res.statusCode = 404;
        res.end();
    }
}
