export const emit = (
    eventName: Gtag.EventNames | string,
    options: Gtag.ControlParams | Gtag.EventParams | Gtag.CustomParams = {}
) => {
    try {
        if (typeof window !== "undefined") {
            if (process.env.NEXT_PUBLIC_ENV === "production") {
                window.gtag("event", eventName, { ...options });
            } else {
                console.debug("Event:", eventName, options);
            }
        }
    } catch (err) {
        console.log(err);
    }
};
