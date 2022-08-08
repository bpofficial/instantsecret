import { Button, Flex, Heading, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageWrapper } from "../components";

export default function FiveHundredErrorPage() {
    const router = useRouter();
    return (
        <PageWrapper center fullHeight>
            <FiveHundredMetadata />
            <Flex w="100%" justifyContent="center" alignItems="center">
                <VStack spacing={6} pb="24">
                    <Heading
                        color="custom.300"
                        fontSize={"5xl"}
                        fontWeight="800"
                    >
                        500
                    </Heading>
                    <Heading
                        color="custom.400"
                        fontSize={"2xl"}
                        fontWeight="800"
                    >
                        We experienced an issue processing your request.
                    </Heading>
                    <Button
                        variant="link"
                        color="custom.400"
                        onClick={() => router.push("/")}
                    >
                        Return home
                    </Button>
                </VStack>
            </Flex>
        </PageWrapper>
    );
}

const FiveHundredMetadata = () => {
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
