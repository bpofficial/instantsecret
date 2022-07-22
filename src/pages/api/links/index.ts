import { API } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";
import { parseBody } from "../../../utils/parseBody";

export default function linksReq(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {
          value,
          passphrase = null,
          ttl = null,
          recipients = [],
          internal = null,
        } = req.body ?? {}

        try {
            return API.post("LinksEndpoint", "/links", {
                body: {
                value,
                passphrase,
                ttl,
                internal,
                recipients,
                },
            }).then((result) => {
                res.redirect(`/links/${result.linkId}`);
            }).catch(() => res.end());
        } catch (err: any) {
            console.log(err);
        }
    }
    res.end();
}
