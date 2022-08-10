/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ["en-AU", "en-GB", "en-US", "en-NZ"],
        localeDetection: true,
        defaultLocale: "en-AU",
    },
    trailingSlash: false,
};

module.exports = nextConfig;
