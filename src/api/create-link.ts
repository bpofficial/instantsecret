import { ServerResponse } from "http";
import { customAlphabet } from "nanoid";
import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import { getDynamodb } from "../aws";
import { parseBody } from "../utils/parseBody";
import { encryptValue, hash, hashPassword } from "./encryption";
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
        const idHash = hash(id);

        const secretId = generateKey();
        const secretIdHash = hash(secretId);

        const passphrase = req.body.passphrase
            ? hashPassword(req.body.passphrase)
            : null;
        const createdAt = new Date();
        const { iv, value } = encryptValue(
            req.body.value,
            createdAt.getTime(),
            secretId,
            req.body.passphrase
        );

        const ttl = Number(req.body.ttl);

        const item = {
            id: idHash, // linkId
            secretId: secretIdHash, // secretId
            creatorUserID,
            originalSize: req.body.value.length,
            recipients: req.body.recipients || [],
            ttl: Number.isNaN(ttl) ? 1000 * 60 * 60 * 24 * 7 : ttl, // 7 days default,
            internal: req.body.internal === true,
            createdAt: createdAt.toISOString(),
            secure: {
                iv,
                value,
                passphrase,
            },
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

        if (endpoint === "api") {
            return {
                secretId,
            };
        } else {
            return {
                linkId: id,
                secret: {
                    secretKey: secretId,
                    value: req.body.value,
                    ttl: item.ttl,
                    encrypted: !!item.secure.passphrase,
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
