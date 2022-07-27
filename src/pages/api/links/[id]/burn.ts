import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "../../../../api/encryption";
import { getDynamodb } from "../../../../aws";

async function DeleteLink(req: NextApiRequest, res: NextApiResponse) {
    const { dynamodb, tableName, env } = getDynamodb();
    const id = req.query["id"];

    if (!id) {
        const url = new URL(req.headers["referer"] || "");
        url.searchParams.set("error", "Not Found");
        res.redirect(url.toString());
        return;
    }

    const idHash = hash(id.toString());

    const record = await dynamodb
        .get({
            TableName: tableName,
            Key: {
                id: idHash,
            },
        })
        .promise();

    if (!record || !record.Item || record.Item.burntAt) {
        const url = new URL(req.headers["referer"] || "");
        url.searchParams.set("error", "Not Found");
        res.redirect(url.toString());
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
        const url = new URL(req.headers["referer"] || "");
        url.searchParams.set("error", "Not Found");
        res.redirect(url.toString());
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
        const url = new URL(req.headers["referer"] || "");
        url.searchParams.set("error", "Not Found");
        res.redirect(url.toString());
        return;
    }
}
