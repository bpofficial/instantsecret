function parseJson(str: string) {
    if (str.length === 0) {
        // special-case empty json body, as it's a common client-side mistake
        return {};
    }
    try {
        return JSON.parse(str);
    } catch (e) {
        throw new Error("Invalid JSON");
    }
}

export async function parseBody(req: any, limit: string) {
    const _contentType = require("next/dist/compiled/content-type");

    let contentType;
    try {
        contentType = _contentType.parse(req.headers["content-type"] || "text/plain");
    } catch  {
        contentType = _contentType.parse("text/plain");
    }
    const { type , parameters  } = contentType;
    const encoding = parameters?.charset || "utf-8";
    let buffer;
    try {
        const getRawBody = require("next/dist/compiled/raw-body");
        buffer = await getRawBody(req, {
            encoding,
            limit
        });
    } catch (e) {
        console.log(e)
        throw new Error("Invalid body");
    }
    const body = buffer.toString();
    if (type === "application/json" || type === "application/ld+json") {
        return parseJson(body);
    } else if (type === "application/x-www-form-urlencoded") {
        const qs = require("querystring");
        return qs.decode(body);
    } else {
        return body;
    }
}
