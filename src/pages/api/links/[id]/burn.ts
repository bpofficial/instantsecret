import { NextApiRequest, NextApiResponse } from "next";
import { AwsService, getDynamodb } from "../../../../aws";

async function DeleteLink(req: NextApiRequest, res: NextApiResponse) {
    const { dynamodb, tableName, env } = getDynamodb()
    const id = req.query['id'];

    if (!id) {
        const url = new URL(req.headers['referer'] || '')
        url.searchParams.set('error', 'Not Found')
        res.redirect(url.toString())
        return;
    }

    const record = await dynamodb.get({
        TableName: tableName,
        Key: {
            id,
        }
    }).promise()

    if (!record || !record.Item || record.Item.burntAt) {
        const url = new URL(req.headers['referer'] || '')
        url.searchParams.set('error', 'Not Found')
        res.redirect(url.toString())
        return;
    }

    const result = await (new AwsService.SecretsManager()).deleteSecret({ SecretId: `/secrets/${env}/${record.Item.secretId}` }).promise();

    if (result.$response.error) {
        const url = new URL(req.headers['referer'] || '')
        url.searchParams.set('error', 'Not Found')
        res.redirect(url.toString())
        return;
    }

    const update = await dynamodb.update({
        TableName: tableName,
        Key: {
            id
        },
        UpdateExpression: 'SET burntAt = :burntAt',
        ExpressionAttributeValues: { ':burntAt': new Date().toISOString() }
    }).promise();

    if (update.$response.error) {
        const url = new URL(req.headers['referer'] || '')
        url.searchParams.set('error', 'Not Found')
        res.redirect(url.toString())
        return;
    }

    res.redirect(`/links/${id}`)
}

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        return DeleteLink(req, res)
    } else {
        const url = new URL(req.headers['referer'] || '')
        url.searchParams.set('error', 'Not Found')
        res.redirect(url.toString())
        return;
    }
}
