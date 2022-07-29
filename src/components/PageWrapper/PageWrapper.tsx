import { Flex } from "@chakra-ui/react";
import { PAGE_MAX } from "../../constants";

export const PageWrapper = ({
    children,
    align = "center",
    center = false,
}: any) => {
    return (
        <Flex
            data-type={"page-wrapper"}
            w="100%"
            px={[4, 8, 0]}
            alignItems={["center", align]}
            maxW={PAGE_MAX}
            mx={"auto"}
            mt={[2, 2, 4, 8]}
            justifyContent={["center", align]}
            h="100%"
        >
            {center ? (
                <Flex w="100%" h="100%" justify="center">
                    {children}
                </Flex>
            ) : (
                children
            )}
            <style global jsx>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > div {
                    height: 100%;
                }

                @import url("https://rsms.me/inter/inter.css");
                html {
                    font-family: "Inter", sans-serif;
                }
                @supports (font-variation-settings: normal) {
                    html {
                        font-family: "Inter var", sans-serif;
                    }
                }
            `}</style>
        </Flex>
    );
};
