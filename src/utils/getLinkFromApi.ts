import { getProtocol } from "./getProtocol";

interface Options {
    creator?: boolean;
    recipient?: boolean;
    host: string
}

export async function getLinkFromApi(id: string, { creator, recipient, host }: Options) {
    const url = new URL(`${getProtocol()}://${host}/api/links/${id}`);

    if (typeof creator === 'boolean') {
        url.searchParams.set("creator", creator ? 'true' : 'false');
    } else if (typeof recipient === 'boolean') {
        url.searchParams.set("recipient", recipient ? "true" : "false");
    }

    const result = await fetch(url.toString());
    if (result.status === 404) {
        return null
    }

    const body = await result.json();
    return body;
}
