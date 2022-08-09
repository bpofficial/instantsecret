import { getDynamodb } from "../aws";

export const getCounterValue = async () => {
    const { dynamodb, tableName } = getDynamodb();

    const result = await dynamodb
        .scan({
            TableName: tableName,
            Select: "COUNT",
        })
        .promise();

    return result.Count;
};
