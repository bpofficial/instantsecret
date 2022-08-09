import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
    PageWrapper,
    Timeline,
    TimelineItems,
    WatchADemo,
} from "../components";
import { getLayout } from "../components/Layouts/BaseLayout";
import { Subtitle, Title, TitleHighlight } from "../components/Title";
import { withCounterProps } from "../utils";

export const getServerSideProps = withCounterProps({
    props: {
        items: {
            left: [
                {
                    title: "A link is generated",
                    content:
                        "A secure one-time link is created and is the only way the original content can be decrypted.",
                },
                {
                    title: "Share the secure link",
                    content:
                        "Send the secure link to the intended recipient, it can only be opened once.",
                },
                {
                    title: "Gone, without a trace.",
                    content:
                        "All of your encrypted, confidential information has been completely deleted from our databases.",
                },
            ],
            right: [
                {
                    title: "Create a secure link",
                    content:
                        "Enter your confidential information into our forms and we'll create a secure, single-use link for you to share.",
                },
                {
                    title: "Encrypt your content",
                    content:
                        "Your content is encrypted and a one-time key is generated that allows access to the original information. No decryption information is stored in our databases.",
                },
                {
                    title: "Rock-solid security",
                    content:
                        "Utilising the same 256-bit encryption as global banking platforms, you can rest assured that nobody has access to your secure content.",
                },
                {
                    title: "Decrypted and automatically deleted",
                    content:
                        "Once the secure link has been opened by the recipient, it can never be opened again.",
                },
            ],
        },
    },
});

export default function Security({ items }: { items: TimelineItems }) {
    return (
        <PageWrapper fullHeight>
            <SecurityMetadata />
            <Flex
                mb={["8", "12", "24"]}
                mt={["4", "8", "8", "36"]}
                direction="column"
                maxW="100%"
                position="relative"
            >
                <Flex
                    direction={[
                        "column",
                        "column",
                        "column",
                        "column",
                        "row",
                        "row",
                    ]}
                    justify={[
                        "center",
                        "center",
                        "center",
                        "center",
                        "space-between",
                    ]}
                    align={[
                        "center",
                        "center",
                        "center",
                        "center",
                        "initial",
                        "initial",
                    ]}
                    maxW="100%"
                    position="relative"
                >
                    <SecurityTitle />
                    <DesktopSecurityContent
                        items={{
                            ...items,
                            left: [{ empty: true }, ...items.left],
                        }}
                    />
                    <MobileSecurityContent items={items} />
                </Flex>
            </Flex>
        </PageWrapper>
    );
}
Security.getLayout = getLayout;

const DesktopSecurityContent = ({ items }: { items: TimelineItems }) => {
    return (
        <Flex
            align="left"
            direction="column"
            maxW={"60%"}
            w="100%"
            display={["none", "none", "none", "none", "flex", "flex"]}
            marginLeft="-400px"
        >
            <Flex justify="space-between" w="100%">
                <Timeline items={items} startingSide="right" />
            </Flex>
        </Flex>
    );
};

const MobileSecurityContent = ({ items }: { items: TimelineItems }) => {
    return (
        <Flex
            align="center"
            mb={["12"]}
            direction="column"
            w={["100%", "100%", "90%", "80%"]}
            display={["flex", "flex", "flex", "flex", "none", "none"]}
        >
            <Flex justify="space-between" w="100%">
                <Timeline items={items} startingSide="right" />
            </Flex>
        </Flex>
    );
};

const SecurityTitle = () => {
    const router = useRouter();

    return (
        <Box
            maxW={["100%", "100%", "100%", "100%", "60%", "50%"]}
            minW={["100%", "100%", "100%", "100%", "60%", "50%"]}
            mb={["12"]}
        >
            <VStack align="flext-start" spacing={[6, 8]}>
                <Title>
                    <TitleHighlight>256-bit encryption</TitleHighlight>
                    to keep your private information secure
                </Title>
                <Subtitle>
                    We&apos;re always working on new features and upgrades to
                    continue to deliver the best experience possible.
                </Subtitle>

                <Flex
                    justify={["center", "center", "left"]}
                    flexDirection={["column", "row"]}
                >
                    <WatchADemo />
                    <Button
                        variant="link"
                        color="custom.400"
                        pt={["4", "0"]}
                        pl={["0", "8"]}
                        onClick={() => router.push(`/links`)}
                    >
                        Create a secure link
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );
};

const SecurityMetadata = () => {
    return (
        <Head>
            <title>Security - Instant Secure Link</title>
            <meta name="title" content="Security - Instant Secure Link" />
            <meta
                name="description"
                content="We're always working on new features and upgrades to continue to deliver the best experience possible."
            />
        </Head>
    );
};
