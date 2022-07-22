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
        let creatorUserID = null;
        const rawToken = req.headers['authorization'];
        if (rawToken) {
            const token = jwt.decode(rawToken.slice(7));
            creatorUserID = token.sub;
        }

        if (!req.body || !req.body.value) {
            const url = new URL(req.headers['referer'] || '')
            url.searchParams.set('error', 'Bad Request')
            url.searchParams.set('error_description', 'Expected body to not be empty. Missing required \'value\' property.')
            res.redirect(url.toString())
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
            const url = new URL(req.headers['referer'] || '')
            url.searchParams.set('error', 'Internal Server Error')
            url.searchParams.set('error_description', 'Failed to create link.')
            res.redirect(url.toString())
            return;
        }

        // Using overwrite: true to enforce that someone trying to recreate a dummy secret with the same key doesn't get the original secret.
        const secret = await (new AwsService.SecretsManager()).createSecret({ Name: `/secrets/${env}/${secretId}`, SecretString: req.body.value, ForceOverwriteReplicaSecret: false }).promise();
        if (secret.$response.error) {
            const url = new URL(req.headers['referer'] || '')
            url.searchParams.set('error', 'Internal Server Error')
            url.searchParams.set('error_description', 'Failed to create link.')
            res.redirect(url.toString())
            return;
        }

        res.redirect(308, `/links/${id}`)
    } else {
        res.statusCode = 404;
        res.end();
    }
}
