import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "../../../../api/encryption";
import { getDynamodb } from "../../../../aws";

async function DeleteLink(req: NextApiRequest, res: NextApiResponse) {
    const { dynamodb, tableName } = getDynamodb();
    const id = req.query["id"];

    if (!id || typeof id !== "string") {
        res.redirect("/404");
        return;
    }

    const idHash = hash(id);

    const record = await dynamodb
        .get({
            TableName: tableName,
            Key: {
                id: idHash,
            },
        })
        .promise();

    if (!record || !record.Item || record.Item.burntAt) {
        res.redirect("/404");
        return;
    }

    const update = await dynamodb
        .update({
            TableName: tableName,
            Key: {
                id: idHash,
            },
            UpdateExpression: "SET burntAt = :burntAt, secure = :secure",
            ExpressionAttributeValues: {
                ":burntAt": new Date().toISOString(),
                ":secure": {},
            },
        })
        .promise();

    if (update.$response.error) {
        res.redirect("/404");
        return;
    }

    res.redirect(302, `/links/${id}/`);
}

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        return DeleteLink(req, res);
    } else {
        res.redirect("/404");
        return;
    }
}
