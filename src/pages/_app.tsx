import { UserProvider } from "@auth0/nextjs-auth0";
import { Box, chakra, ChakraProvider, extendTheme, Spacer } from "@chakra-ui/react";
import { AppProps } from "next/app";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Banner, Footer, TopBar } from "../components";
import { CounterProvider } from "../hooks";

export default function App({ Component, pageProps }: AppProps) {
    return (
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
                        {!!(Component as any).showBanner ? <Box>
                            <Spacer h={["60px", "60px", "120px"]} />
                        </Box> : <></>}
                        <Footer showBanner={!!(Component as any).showBanner} />
                    </chakra.main>
                </CounterProvider>
            </ChakraProvider>
        </UserProvider>
    );
}
