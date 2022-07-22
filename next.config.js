/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en-US'],
    localeDetection: true,
    defaultLocale: 'en-US'
  },
}

module.exports = nextConfig
