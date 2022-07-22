/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  i18n: {
    locales: ['en-US'],
    localeDetection: true,
    defaultLocale: 'en-US'
  },
  trailingSlash: true,
  webpack5: false
};

module.exports = nextConfig;
