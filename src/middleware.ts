import {
    chainMatch,
    csp,
    isPageRequest,
    strictDynamic,
} from "@next-safe/middleware";

const isDev = process.env.NODE_ENV !== "production";

const securityMiddleware: any[] = [
    csp({
        isDev,
        // your CSP base configuration with IntelliSense
        // single quotes for values like 'self' are automatic
        directives: {
            "img-src": ["self", "data:"],
            "frame-src": ["https://www.youtube.com/"],
            "script-src": ["self"],
            "script-src-elem": [
                "self",
                "https://www.googletagmanager.com/",
                "unsafe-inline",
            ],
            "style-src": ["self", "unsafe-inline"],
            "style-src-attr": ["unsafe-inline"],
        },
    }),
    strictDynamic(),
];

export default chainMatch(isPageRequest)(...securityMiddleware);
