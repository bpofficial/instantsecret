import { API } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";

export default function linksReq(req: NextApiRequest, res: NextApiResponse) {
    console.log(req)
    if (req.method === "POST") {
        const {
            value,
            passphrase = null,
            ttl = null,
            recipients = [],
            internal = null,
        } = req.body ?? {}

        return API.post("LinksEndpoint", "/links", {
            body: {
                value,
                passphrase,
                ttl,
                internal,
                recipients,
            },
        }).then((result: any) => {
            console.log(result)
            res.redirect(303, `/links/${result.linkId}`);
        }).catch((err: any) => {
            console.log(err)
            res.redirect(303, `/links?error=${(err.message || err)}&error_code=500`);
        });
    } else {
        res.statusCode = 204;
        res.end();
    }
}
