import AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_REGION,
    signatureVersion: "v4",
});

export const AwsService = AWS;

export const getDynamodb = () => {
    const dynamodb = new AwsService.DynamoDB.DocumentClient();

    let env = "default";
    let tableName = process.env.DYNAMO_TABLE_NAME!;
    if (process.env.ENV && process.env.ENV !== "NONE") {
        env = process.env.ENV;
        tableName = tableName + "-" + process.env.ENV;
    }

    return { dynamodb, tableName, env };
};
