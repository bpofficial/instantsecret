

import { NextApiRequest, NextApiResponse } from "next";
import { AwsService, getDynamodb } from "../../../../aws";

async function GetLink(req: NextApiRequest, res: NextApiResponse) {
    const { dynamodb, tableName, env } = getDynamodb()
    const id = decodeURIComponent(req.query?.['id']?.toString?.() ?? '');
    const viewedByCreator = req.query['creator'] === 'true';
    const viewedByRecipient = req.query['recipient'] === 'true';
    const passphrase = req.body['passphrase'] || null;

    if (!id) {
        res.statusCode = 404;
        res.end();
        return;
    }

    let record;
    try {
        if (viewedByCreator) {
            record = await dynamodb.get({
                TableName: tableName,
                Key: {
                    id,
                }
            }).promise()
        } else {
            // Need to scan since we're not using a primary key :sigh:
            // deepcode ignore NoSqli: ?
            record = await dynamodb.scan({
                TableName: tableName,
                FilterExpression: 'secretKey = :secretKey',
                ExpressionAttributeValues: { ':secretKey': id }
            }).promise()

            if (!record || record.$response.error || record.Count === 0) {
                res.statusCode = 404;
                res.end();
                return;
            }

            if (record && record.Count && record.Count > 1) {
                console.log('More than 1 secret found with id', id);
                res.statusCode = 404;
                res.end();
                return;
            }

            record = { Item: record.Items?.[0] ?? null }
        }
    } catch (err) {
        console.log(err);
        record = {}
    }

    if (!record || !record.Item || (record.Item.burntAt && !viewedByCreator)) {
        res.statusCode = 404;
        res.end();
        return;
    }

    let canViewSecretValue = false;
    const passphraseMatch = record.Item.passphrase ? passphrase === record.Item.passphrase : true
    if ((viewedByCreator && !record.Item.viewedByCreatorAt) || (viewedByRecipient && !record.Item.viewedByRecipientAt && passphraseMatch)) {
        canViewSecretValue = true;
        try {
            const update = await dynamodb.update({
                TableName: tableName,
                Key: {
                    id: record.Item.id
                },
                UpdateExpression: 'SET #viewTimeProp = :viewedAt',
                ExpressionAttributeValues: { ':viewedAt': new Date().toISOString() },
                ExpressionAttributeNames: { '#viewTimeProp': viewedByCreator ? 'viewedByCreatorAt' : 'viewedByRecipientAt' }
            }).promise();
            if (update.$response.error) {
                console.log(update.$response);
                res.statusCode = 500
                res.end();
                return;
            }
        } catch (err) {
            console.log(err);
            res.statusCode = 500
            res.end();
            return;
        }
    }

    let secret;
    try {
        if (canViewSecretValue) {
            secret = await (new AwsService.SecretsManager()).getSecretValue({ SecretId: `/secrets/${env}/${record.Item.secretId}` }).promise();
        }
    } catch (err) {
        console.log(err);
        res.statusCode = 500
        res.end();
        return;
    }

    if (secret && secret.$response.error) {
        res.statusCode = 404;
        res.end();
        return;
    }

    res.statusCode = 200;
    res.json({
        secretKey: record.Item.secretKey,
        value: secret ? secret.SecretString : null,
        ttl: record.Item.ttl,
        encrypted: !!record.Item.passphrase,
        burntAt: record.Item.burntAt,
        createdAt: record.Item.createdAt,
        viewedByCreatorAt: record.Item.viewedByCreatorAt,
        viewedByRecipientAt: record.Item.viewedByRecipientAt,
    })
}

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return GetLink(req, res)
    } else {
        res.statusCode = 404;
        res.end();
    }
}
