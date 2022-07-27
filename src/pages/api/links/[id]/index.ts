import * as Crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
import {
    comparePassword,
    decryptValue,
    hash,
} from "../../../../api/encryption";
import { getDynamodb } from "../../../../aws";

async function GetLink(req: NextApiRequest, res: NextApiResponse) {
    const { dynamodb, tableName, env } = getDynamodb();
    const id = decodeURIComponent(req.query?.["id"]?.toString?.() ?? "");
    const viewedByCreator = req.query["creator"] === "true";
    const viewedByRecipient = req.query["recipient"] === "true";
    const passphrase = req.query["passphrase"] || null;

    if (!id) {
        res.statusCode = 404;
        res.end();
        return;
    }

    let record;
    try {
        if (viewedByCreator) {
            record = await dynamodb
                .get({
                    TableName: tableName,
                    Key: {
                        id: hash(id),
                    },
                })
                .promise();
        } else {
            // Need to scan since we're not using a primary key :sigh:
            // deepcode ignore NoSqli: ?
            record = await dynamodb
                .scan({
                    TableName: tableName,
                    FilterExpression: "secretId = :secretId",
                    ExpressionAttributeValues: { ":secretId": hash(id) },
                })
                .promise();

            if (!record || record.$response.error || record.Count === 0) {
                res.statusCode = 404;
                res.end();
                return;
            }

            if (record && record.Count && record.Count > 1) {
                console.log("More than 1 secret found with id", hash(id));
                res.statusCode = 404;
                res.end();
                return;
            }

            record = { Item: record.Items?.[0] ?? null };
        }
    } catch (err) {
        console.log(err);
        record = {};
    }

    if (!record || !record.Item || (record.Item.burntAt && !viewedByCreator)) {
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
        (viewedByCreator && !record.Item.viewedByCreatorAt) ||
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
                    UpdateExpression: "SET #viewTimeProp = :viewedAt",
                    ExpressionAttributeValues: {
                        ":viewedAt": new Date().toISOString(),
                    },
                    ExpressionAttributeNames: {
                        "#viewTimeProp": viewedByCreator
                            ? "viewedByCreatorAt"
                            : "viewedByRecipientAt",
                    },
                })
                .promise();
            if (update.$response.error) {
                console.log(update.$response);
                res.statusCode = 500;
                res.end();
                return;
            }
        } catch (err) {
            console.log(err);
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
        res.statusCode = 401;
        res.json({
            code: 401,
            error: "Unauthorized",
            description: "The passphrase didn't match.",
            meta: {
                fieldError: true,
            },
        });
    }

    let secret;
    try {
        if (canViewSecretValue) {
            const secure = record.Item.secure;
            const createdAt = new Date(record.Item.createdAt).getTime();
            secret = decryptValue(
                secure.value,
                secure.iv,
                id,
                createdAt,
                passphrase?.toString()
            );
        }
    } catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.end();
        return;
    }

    if (secret && secret.length !== record.Item.originalSize) {
        // bad decipher
        console.log("Failed to properly decipher");
        res.statusCode = 500;
        res.end();
        return;
    }

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
