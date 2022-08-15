/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ["en-AU"],
        localeDetection: true,
        defaultLocale: "en-AU",
    },
    trailingSlash: false,
};

module.exports = nextConfig;
