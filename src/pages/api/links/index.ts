import { NextApiRequest, NextApiResponse } from "next";
import { createLink } from "../../../api/create-link";

export default async function CreateLinkHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return createLink(req, res, "api");
}
