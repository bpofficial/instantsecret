import {
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    HStack,
    useBreakpointValue,
    VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { CreateLinkForm, PageWrapper, WatchADemo } from "../components";
import { useTranslation } from "../hooks";

export default function Index() {
    const isMobile = useBreakpointValue([
        true,
        true,
        true,
        false,
        false,
        false,
    ]);

    return (
        <PageWrapper fullHeight={!isMobile} center={!isMobile}>
            <IndexMetadata />
            <Flex
                direction={["column", "column", "column", "row"]}
                justify={["center", "center", "center", "space-between"]}
                align={"center"}
                maxW={"100%"}
                h="100%"
                mt={isMobile ? "50px" : "0"}
                mb={isMobile ? "50px" : "0"}
            >
                <IndexCopyContent />
                <Box
                    maxW={["100%", "100%", "100%", "460px", "620px"]}
                    w="100%"
                    mt={["20px", "20px", "32px", "0px"]}
                >
                    <CreateLinkForm />
                </Box>
            </Flex>
        </PageWrapper>
    );
}
(Index as any).showBanner = true;

export const IndexCopyContent = () => {
    const translation = useTranslation("index");
    const router = useRouter();

    return (
        <Box maxW={["100%", "100%", "100%", "50%"]}>
            <VStack align="flext-start" spacing={6}>
                <Heading
                    fontSize={["32px", "32px", "36px", "36px", "48px"]}
                    fontWeight="extrabold"
                >
                    <chakra.span color="custom.300">
                        {translation.copy.coloredTitle}
                    </chakra.span>
                    &nbsp;
                    {translation.copy.remainingTitle}
                </Heading>

                <Box color="custom.400" fontWeight="600">
                    {translation.copy.subtitle}
                </Box>

                <Flex w="100%" justify={["left"]}>
                    <HStack spacing="8" maxW="92%">
                        <WatchADemo />
                        <Button
                            variant="link"
                            color="custom.400"
                            onClick={() => router.push(`/security`)}
                        >
                            {translation.copy.securityButton}
                        </Button>
                    </HStack>
                </Flex>
            </VStack>
        </Box>
    );
};

const IndexMetadata = () => {
    return (
        <Head>
            <meta
                name="title"
                content="Instant Secure Link - Create One-Time Secure Links Instantly"
            />
            <meta
                name="description"
                content="Keep sensitive information out of your email and chat logs with a free, secure and encrypted link that can only be viewed once and then it's gone forever."
            />
        </Head>
    );
};
