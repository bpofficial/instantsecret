/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || "https://instantsecurelink.com",
    generateRobotsTxt: true,
};

module.exports = config;
