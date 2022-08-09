import { default as GtagFn } from "ga-gtag";

export const emit = (
    eventName: Gtag.EventNames | string,
    options: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams = {}
) => {
    try {
        if (typeof window !== "undefined") {
            console.debug("Event:", eventName, options);
            if (process.env.NEXT_PUBLIC_ENV === "production") {
                GtagFn("event", eventName, { ...options });
            }
        }
    } catch (err) {
        console.log(err);
    }
};
