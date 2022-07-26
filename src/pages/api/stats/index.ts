import type { NextApiRequest, NextApiResponse } from "next";
import { getDynamodb } from "../../../aws";

export default async function statsHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        const { dynamodb, tableName } = getDynamodb();

        const result = await dynamodb
            .scan({
                TableName: tableName,
                Select: "COUNT",
            })
            .promise();

        res.statusCode = 200;
        res.json({
            value: result.Count,
        });
    }
}
