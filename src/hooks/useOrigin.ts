import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useOrigin() {
    const [host, setHost] = useState("");
    const router = useRouter();

    const isProd = process.env.NEXT_PUBLIC_ENV === "production";
    const isStaging = process.env.NEXT_PUBLIC_ENV === "staging";
    const isDev = process.env.NODE_ENV === "development";

    useEffect(() => {
        const origin = window ? window.location.origin : "";
        setHost(origin);
    }, [router.pathname]);

    return isDev
        ? "http://localhost:3000"
        : isProd
        ? "https://instantsecurelink.com"
        : isStaging
        ? host
        : "";
}
