// Next.js libraries
import {
    getCspInitialProps,
    provideComponents,
} from "@next-safe/middleware/dist/document";
import { Html, Main } from "next/document";
const isProd = true; //process.env.NEXT_PUBLIC_ENV === "production";

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
                {isProd ? <><script async src={`https://www.googletagmanager.com/gtag/js?id="${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}"`}></script>
                    <script>{`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`}
                    </script></> : <></>}
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
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
