import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { PageWrapper } from "../components";

export default function Security() {
    return (
        <PageWrapper>
            <Box p={["4", "24"]} mt={["12"]}>
                <VStack maxW={["100%", "720px"]} align="center" spacing="6">
                    <Box fontSize={"6xl"}>🚧</Box>
                    <Heading
                        fontSize={["2xl", "3xl"]}
                        color="custom.400"
                        fontWeight="800"
                    >
                        Page Under Construction
                    </Heading>
                    <Text align="center" opacity="0.9">
                        We&apos;re still writing this page for you to read, make
                        sure to check back in regularly so you don&apos;t miss
                        when this page is finished.
                    </Text>
                </VStack>
            </Box>
        </PageWrapper>
    );
}
