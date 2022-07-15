// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    NEXT_PUBLIC_AUTH0_DOMAIN: "",
    NEXT_PUBLIC_AUTH0_CLIENT_ID: "",
    NEXT_PUBLIC_AUTH0_REDIRECT_URI: ""
  },
  i18n: {
    locales: ['en-US'],
    localeDetection: true,
    defaultLocale: 'en-US'
  },
  trailingSlash: true,
};

module.exports = withNx(nextConfig);
