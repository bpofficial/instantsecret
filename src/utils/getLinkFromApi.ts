import { getProtocol } from "./getProtocol";

interface Options {
    creator?: boolean;
    recipient?: boolean;
    host: string;
    passphrase?: string | null;
}

export async function getLinkFromApi(
    id: string,
    { creator, recipient, host, passphrase }: Options
) {
    const url = new URL(`${getProtocol()}://${host}/api/links/${id}`);

    let accessType: "creator" | "recipient" | null = null;
    if (typeof creator === "boolean") {
        accessType = "creator";
        url.searchParams.set("creator", creator ? "true" : "false");
    } else if (typeof recipient === "boolean") {
        accessType = "recipient";
        url.searchParams.set("recipient", recipient ? "true" : "false");
        if (passphrase) {
            url.searchParams.set("passphrase", passphrase);
        }
    }

    const result = await fetch(url.toString());

    const statusInt = result.status.toString()[0];
    if (["4", "5"].includes(statusInt)) {
        if (statusInt === "5")
            console.warn(
                "Encountered error:",
                new Date().getTime(),
                result,
                accessType
            );
        return null;
    }

    const body = await result.json();
    return body;
}
