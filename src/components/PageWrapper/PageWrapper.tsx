import { Flex } from "@chakra-ui/react";
import { PAGE_MAX } from "../../constants";

const BASE_OFFSET = "120px";

export const PageWrapper = ({
    children,
    align = "center",
    center = false,
    fullHeight = false,
}: any) => {
    return (
        <Flex
            data-type={"page-wrapper"}
            w="100%"
            py={["50px", "60px", "70px", "80px", "90px", "100px"]}
            px={["20px", "20px", "4", "4", "4", "8"]}
            alignItems={["center", align]}
            maxW={PAGE_MAX}
            mx="auto"
            justifyContent={["center", align]}
            h={fullHeight ? "100%" : undefined}
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
