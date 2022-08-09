import { UserProvider } from "@auth0/nextjs-auth0";
import { chakra, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { ReactNode } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";

type Props = AppProps & {
    Component: AppProps["Component"] & {
        getLayout?: (node: any, props?: any) => ReactNode;
    };
};

const Noop: Required<Props["Component"]>["getLayout"] = (page: ReactNode) =>
    page;

export default function App({ Component, pageProps }: Props) {
    const getLayout = Component.getLayout || Noop;
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
                <chakra.main
                    w="100%"
                    h="100%"
                    display="flex"
                    style={{ flexDirection: "column" }}
                >
                    {getLayout(<Component {...pageProps} />, pageProps)}
                </chakra.main>
            </ChakraProvider>
        </UserProvider>
    );
}
