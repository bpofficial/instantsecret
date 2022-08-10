import { Box, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { CreateLinkForm, PageWrapper, WatchADemo } from "../components";
import { getLayout } from "../components/Layouts/LayoutWithBottomBanner";
import { Subtitle, Title, TitleHighlight } from "../components/Title";
import { useTranslation } from "../hooks";
import { withCounterProps } from "../utils";

export default function Index() {
    return (
        <PageWrapper>
            <IndexMetadata />
            <Flex
                direction={["column", "column", "column", "row"]}
                justify={["center", "center", "center", "space-between"]}
                align={"center"}
                maxW={"100%"}
                h="100%"
            >
                <IndexCopyContent />
                <Box
                    maxW={["100%", "100%", "100%", "460px", "620px"]}
                    w="100%"
                    mt={"60px"}
                >
                    <CreateLinkForm />
                </Box>
            </Flex>
        </PageWrapper>
    );
}
Index.getLayout = getLayout;
export const getServerSideProps = withCounterProps();

export const IndexCopyContent = () => {
    const translation = useTranslation("index");
    const router = useRouter();

    return (
        <Box maxW={["100%", "100%", "100%", "50%"]}>
            <VStack align="flext-start" spacing={6}>
                <Title>
                    <TitleHighlight>
                        {translation.copy.coloredTitle}
                    </TitleHighlight>
                    {translation.copy.remainingTitle}
                </Title>
                <Subtitle>{translation.copy.subtitle}</Subtitle>
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
            <title>
                Instant Secure Link - Create One-Time Secure Links Instantly
            </title>
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
