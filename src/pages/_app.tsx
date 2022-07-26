import { Auth0Provider } from "@auth0/auth0-react";
import { chakra, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Banner, TopBar } from "../components";
import { CounterProvider } from "../hooks";

export default function InstantSecret({ Component, pageProps }: AppProps) {
    return (
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
            redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI!}
        >
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
                })}
            >
                <Head>
                    <meta charSet="utf-8" />
                    <title>Home | Instant Secure Link</title>
                    <link
                        rel="canonical"
                        href="http://instantsecurelink.com/"
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
                <CounterProvider>
                    <chakra.main w="100%" h="100%" overflowY="scroll">
                        <Banner />
                        <TopBar />
                        <Component {...pageProps} />
                    </chakra.main>
                </CounterProvider>
            </ChakraProvider>
        </Auth0Provider>
    );
}
