import { UserProvider } from "@auth0/nextjs-auth0";
import { chakra, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Banner, Footer, TopBar } from "../components";
import { CounterProvider } from "../hooks";
import { UnloadProvider, UnloadScript } from "../hooks/unload";

export default function InstantSecret({ Component, pageProps }: AppProps) {
    return (
        <UnloadProvider>
            <UserProvider>
                <ChakraProvider
                    theme={extendTheme({
                        colors: {
                            custom: {
                                50: "#6b798e",
                                100: "#F1FAEE",
                                200: "#A8DADC",
                                300: "#457B9D",
                                400: "#1D3557",
                            },
                        },
                        fonts: {
                            heading: `'Inter', sans-serif`,
                            body: `'Inter', sans-serif`,
                        },
                    })}
                >
                    <Head>
                        <meta charSet="utf-8" />
                        <meta
                            name="title"
                            content="Instant Secure Link - Create One-Time Secure Links Instantly"
                        />
                        <meta
                            name="description"
                            content="Keep sensitive information out of your email and chat logs with a free, secure and encrypted link that can only be viewed once and then it's gone forever."
                        />
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
                        <title>
                            Instant Secure Link - Create One-Time Secure Links
                            Instantly
                        </title>
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
                        <meta
                            name="msapplication-TileColor"
                            content="#da532c"
                        />
                        <meta name="theme-color" content="#ffffff" />
                        <UnloadScript />
                        {/* Global Site Tag (gtag.js) - Google Analytics */}
                        {process.env.NEXT_PUBLIC_ENV === "production" ? (
                            <>
                                <script
                                    async
                                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                                />
                                <script
                                    dangerouslySetInnerHTML={{
                                        __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                                page_path: window.location.pathname,
                                });
                            `,
                                    }}
                                />
                            </>
                        ) : (
                            <></>
                        )}
                    </Head>
                    <CounterProvider>
                        <chakra.main
                            w="100%"
                            h="100%"
                            display="flex"
                            style={{ flexDirection: "column" }}
                        >
                            <Banner />
                            <TopBar />
                            <Component {...pageProps} />
                            <Footer
                                showBanner={!!(Component as any).showBanner}
                            />
                        </chakra.main>
                    </CounterProvider>
                </ChakraProvider>
            </UserProvider>
        </UnloadProvider>
    );
}
