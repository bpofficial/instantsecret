// Next.js libraries
import {
    getCspInitialProps,
    provideComponents,
} from "@next-safe/middleware/dist/document";
import { Head, Html, Main } from "next/document";
// Next Strict Content Security Policy
import { NextStrictCSP } from "next-strict-csp";

const isProd = true; //process.env.NEXT_PUBLIC_ENV === "production";

// Enable Head Strict CSP in production mode only
const HeadCSP = isProd ? NextStrictCSP : Head;

// Google Tag Manager Script (Optional)
const GTMJs = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`;

NextStrictCSP.inlineJs = [GTMJs];

export const getInitialProps = async (ctx: any) => {
    const initialProps = await getCspInitialProps({ ctx });
    return initialProps;
};

// Document component
export default function Document(props: any) {
    const { Head, NextScript } = provideComponents(props);
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="keywords"
                    content="instant, security, secure, one-time, secret, one-time-secret, onetimesecret"
                />
                <meta name="robots" content="index, follow" />
                <meta
                    httpEquiv="Content-Type"
                    content="text/html; charset=utf-8"
                />
                <meta name="language" content="English" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta
                    property="og:image"
                    content="https://www.instantsecurelink.com/assets/media.jpg"
                />
                <link
                    rel="canonical"
                    href="https://www.instantsecurelink.com/"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />

                {/* Google Tag Manager */}
                {isProd && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: GTMJs,
                        }}
                    />
                )}
                {/* End Google Tag Manager */}
            </Head>
            <body>
                {isProd && (
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                        }}
                    />
                )}

                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
