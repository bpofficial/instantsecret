import { Amplify } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";

export default function linksReq(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {
            value,
            passphrase = null,
            ttl = null,
            recipients = [],
            internal = null,
        } = req.body ?? {}

        return Amplify.API.post("LinksEndpoint", "/links", {
            body: {
                value,
                passphrase,
                ttl,
                internal,
                recipients,
            },
        }).then((result: any) => {
            res.redirect(`/links/${result.linkId}`);
        }).catch((err: any) => {
            res.statusCode = 500
            res.json(err)
        });
    } else {
        res.statusCode = 204;
        res.end();
    }
}
