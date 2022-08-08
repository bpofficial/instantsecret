const nextSafe = require("next-safe");
const isDev = process.env.NODE_ENV !== "production";

/** @type {import('next-safe/types/types').NextSafeConfig} */
const headerConfig = {
    isDev,
    contentSecurityPolicy: {
        "frame-src": "https://www.youtube.com/",
        "img-src": "'self' data: https:",
        "style-src": "'self' 'unsafe-inline'",
        "style-src-attr": "'unsafe-inline'",
    },
};
const headers = nextSafe(headerConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ["en-US"],
        localeDetection: true,
        defaultLocale: "en-US",
    },
    trailingSlash: true,
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: "/:path*",
                headers,
            },
        ];
    },
};

module.exports = nextConfig;
