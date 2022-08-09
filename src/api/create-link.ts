import { getSession } from "@auth0/nextjs-auth0";
import * as Crypto from "crypto";
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
    const { dynamodb, tableName } = getDynamodb();
    if (req.method === "POST") {
        let creatorUser = getSession(req, res);
        const creatorUserID = creatorUser?.user?.sub ?? null;

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

        const createdAt = new Date();

        const id = generateKey();
        const idHash = hash(id).toString("hex");

        // deepcode ignore InsecureHash: This isn't important, as its only being shown to the user than SHA512'd away.
        const secretId = Crypto.createHash("md5")
            .update(id + createdAt.toISOString())
            .digest("hex");

        const secretIdHash = hash(secretId).toString("hex");

        const rawPassphrase =
            typeof req.body.passphrase !== "string"
                ? null
                : String(req.body.passphrase);
        const passphrase = rawPassphrase ? hashPassword(rawPassphrase) : null;
        const secretEncryption = encryptValue(
            req.body.value,
            createdAt.getTime(),
            secretId,
            rawPassphrase
        );

        const creatorEncryption = encryptValue(
            req.body.value,
            createdAt.getTime(),
            id,
            rawPassphrase
        );

        const ttl = Number(req.body.ttl);

        const value =
            typeof req.body.value !== "string" ? "" : String(req.body.value);

        const item = {
            id: idHash, // linkId
            secretId: secretIdHash, // secretId
            creatorUserID,
            originalSize: value.length,
            recipients: req.body.recipients || [],
            ttl: Number.isNaN(ttl) ? 1000 * 60 * 60 * 24 * 7 : ttl, // 7 days default,
            internal: req.body.internal === true,
            createdAt: createdAt.toISOString(),
            secure: {
                ...secretEncryption,
                creatorEncryption,
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
            (res as NextApiResponse).redirect(`/links/${id}`);
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
