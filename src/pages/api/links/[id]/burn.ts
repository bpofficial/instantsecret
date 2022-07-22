import { API } from "aws-amplify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function burnLinkReq(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query ?? {};
    if (req.method === 'POST') {
        try {
            await API.del('LinksEndpoint', `/links/${id}`, {});
        } catch (err: any) {
            //
        }
    }
    res.redirect(`/links/${id}`)
    return;
}
