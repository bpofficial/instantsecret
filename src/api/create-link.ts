import { ServerResponse } from "http";
import { customAlphabet } from "nanoid";
import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import { AwsService, getDynamodb } from "../aws";
import { parseBody } from "../utils/parseBody";
const jwt = require("jsonwebtoken");
const generateKey = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    32
);

interface ServerError {
    code: number;
    error?: string;
    description?: string;
    res?: ServerResponse;
}

const handleError = ({ res, ...error }: ServerError) => {
    if (res) res.statusCode = error.code;
    return error;
};

export async function createLinkFromApi(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return createLink(req, res, "api");
}

export async function createLinkFromClient(ctx: GetServerSidePropsContext) {
    return createLink(ctx.req, ctx.res, "client");
}

async function createLink(req: any, res: any, endpoint: "client" | "api") {
    const { dynamodb, tableName, env } = getDynamodb();
    if (req.method === "POST") {
        let creatorUserID = null;
        const rawToken = req.headers["authorization"];
        if (rawToken) {
            const token = jwt.decode(rawToken.slice(7));
            creatorUserID = token.sub;
        }

        if (endpoint === "client") {
            req.body = await parseBody(req, "1mb");
            console.log(req.body);
        }

        if (!req.body || !req.body.value) {
            return handleError({
                code: 400,
                error: "Bad Request",
                description:
                    "Expected body to not be empty. Missing required 'value' property.",
                res,
            });
        }

        const id = generateKey();
        const secretId = generateKey();
        const secretKey = generateKey();

        const ttl = Number(req.body.ttl);

        const item = {
            id, // linkId
            secretId, // secretId
            secretKey,
            creatorUserID,
            recipients: req.body.recipients || [],
            passphrase: req.body.passphrase || null,
            ttl: Number.isNaN(ttl) ? 1000 * 60 * 60 * 24 * 7 : ttl, // 7 days default,
            internal: req.body.internal === true,
            createdAt: new Date().toISOString(),
            viewedByCreatorAt:
                endpoint === "client"
                    ? new Date(new Date().getTime() + 1000 * 30) // +30s
                    : null,
        };

        const record = await dynamodb
            .put({
                TableName: tableName,
                Item: item,
                ConditionExpression: "attribute_not_exists(id)",
            })
            .promise();

        if (record.$response.error) {
            return handleError({
                code: 500,
                error: "Internal Server Error",
                description: "Failed to create link.",
                res,
            });
        }

        // Using overwrite: true to enforce that someone trying to recreate a dummy secret with the same key doesn't get the original secret.
        const secret = await new AwsService.SecretsManager()
            .createSecret({
                Name: `/secrets/${env}/${secretId}`,
                SecretString: req.body.value,
                ForceOverwriteReplicaSecret: false,
            })
            .promise();
        if (secret.$response.error) {
            return handleError({
                code: 500,
                error: "Internal Server Error",
                description: "Failed to create link.",
                res,
            });
        }

        if (endpoint === "api") {
            return {
                secretId,
            };
        } else {
            return {
                linkId: id,
                secret: {
                    secretKey: item.secretKey,
                    value: req.body.value,
                    ttl: item.ttl,
                    encrypted: !!item.passphrase,
                    createdAt: item.createdAt,
                },
            };
        }
    } else {
        return handleError({
            code: 404,
            error: "Not Found",
            res,
        });
    }
}
