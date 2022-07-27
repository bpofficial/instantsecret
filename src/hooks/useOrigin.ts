import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useOrigin() {
    const [host, setHost] = useState("");
    const router = useRouter();

    useEffect(() => {
        const origin = window ? window.location.origin : "";
        setHost(origin);
    }, [router.pathname]);

    return host;
}
