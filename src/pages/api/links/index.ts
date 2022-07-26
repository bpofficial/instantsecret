import { NextApiRequest, NextApiResponse } from "next";
import { createLinkFromApi } from "../../../api/create-link";

export default async function CreateLinkHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return createLinkFromApi(req, res);
}
