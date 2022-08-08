import {
    chainMatch,
    csp,
    isPageRequest,
    strictDynamic,
} from "@next-safe/middleware";

const securityMiddleware = [
    csp({
        // your CSP base configuration with IntelliSense
        // single quotes for values like 'self' are automatic
        directives: {
            "img-src": ["self", "data:"],
            "frame-src": ["https://www.youtube.com/"],
            "connect-src": ["self", "https://vitals.vercel-insights.com/"],
            "script-src": [
                "self",
                "https://www.googletagmanager.com/",
                "https://vitals.vercel-insights.com/",
            ],
            "style-src": ["self", "unsafe-inline"],
            "style-src-attr": ["unsafe-inline"],
        },
    }),
    strictDynamic(),
];

export default chainMatch(isPageRequest)(...securityMiddleware);
