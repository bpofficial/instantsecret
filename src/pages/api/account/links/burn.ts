import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { getDynamodb } from "../../../../aws";

async function DeleteLink(req: NextApiRequest, res: NextApiResponse) {
    const { dynamodb, tableName } = getDynamodb();
    let creatorUser = getSession(req, res);

    const id = req.body.id;
    const accountId = creatorUser?.user?.sub;

    if (!accountId) {
        res.statusCode = 401;
        res.json({});
        return;
    }

    const record = await dynamodb
        .get({
            TableName: tableName,
            Key: { id },
        })
        .promise();

    if (!record || !record.Item) {
        res.statusCode = 404;
        res.json({});
        return;
    }

    const burntAt = new Date().toISOString();
    const update = await dynamodb
        .update({
            TableName: tableName,
            Key: { id },
            UpdateExpression: "SET burntAt = :burntAt, secure = :secure",
            ExpressionAttributeValues: {
                ":burntAt": burntAt,
                ":secure": {},
            },
        })
        .promise();

    if (update.$response.error) {
        res.statusCode = 500;
        res.json({});
        return;
    }

    res.send({ burntAt });
}

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        return DeleteLink(req, res);
    } else {
        res.redirect("/account");
        return;
    }
}
