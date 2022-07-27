import { Flex } from "@chakra-ui/react";

export const PageWrapper = ({ children, align = "center" }: any) => {
    return (
        <Flex
            data-type={"page-wrapper"}
            w="100%"
            px={[4, 4, 4]}
            alignItems={align}
            maxW={"1400px"}
            mx={"auto"}
            mt={[4, 6, 10, 12]}
            justifyContent={align}
        >
            {children}
            <style global jsx>{`
                html,
                body,
                body > div:first-child,
                div#__next,
                div#__next > div {
                    height: 100%;
                }
            `}</style>
        </Flex>
    );
};
