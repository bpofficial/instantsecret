import { NextApiRequest, NextApiResponse } from "next";
import { AwsService, getDynamodb } from "../../../aws";
import { customAlphabet } from 'nanoid';
const jwt = require('jsonwebtoken');
const generateKey = customAlphabet(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    32
);

export default async function CreateLinkHandler(req: NextApiRequest, res: NextApiResponse) {
    const { dynamodb, tableName, env } = getDynamodb()
    if (req.method === "POST") {
        req.body = JSON.parse(req.body);
        let creatorUserID = null;
        const rawToken = req.headers['authorization'];
        if (rawToken) {
            const token = jwt.decode(rawToken.slice(7));
            creatorUserID = token.sub;
        }

        if (!req.body || !req.body.value) {
            res.statusCode = 400
            res.json({
                code: 400,
                error: 'Bad Request',
                description: `Expected body to not be empty. Missing required 'value' property.`
            })
            return;
        }

        const id = generateKey();
        const secretId = generateKey();
        const secretKey = generateKey();

        const result = await dynamodb.put({
            TableName: tableName,
            Item: {
                id, // linkId
                secretId, // secretId
                secretKey,
                creatorUserID,
                recipients: req.body.recipients || [],
                passphrase: req.body.passphrase || null,
                ttl: req.body.ttl || 1000 * 60 * 60 * 24 * 7, // 7 days default,
                internal: req.body.internal === true
            },
            ConditionExpression: 'attribute_not_exists(id)'
        }).promise()

        if (result.$response.error) {
            res.statusCode = result.$response.httpResponse.statusCode;
            res.json({
                code: result.$response.httpResponse.statusCode,
                error: 'Internal Server Error',
                description: 'Failed to create link.'
            })
        }

        // Using overwrite: true to enforce that someone trying to recreate a dummy secret with the same key doesn't get the original secret.
        const secret = await (new AwsService.SecretsManager()).createSecret({ Name: `/secrets/${env}/${secretId}`, SecretString: req.body.value, ForceOverwriteReplicaSecret: false }).promise();
        if (secret.$response.error) {
            res.statusCode = result.$response.httpResponse.statusCode;
            res.json({
                code: result.$response.httpResponse.statusCode,
                error: 'Internal Server Error',
                description: 'Failed to create link.'
            })
            return;
        }

        res.statusCode = 201;
        res.json({
            linkId: id
        })
    } else {
        res.statusCode = 404;
        res.end();
    }
}
