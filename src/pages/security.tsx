import { Box, Button, chakra, Flex, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
    PageWrapper,
    Timeline,
    TimelineItems,
    WatchADemo,
} from "../components";

export const getStaticProps = () => {
    return {
        props: {
            items: {
                left: [
                    {
                        title: "Left 1",
                        content:
                            "Utilising the same 256bit encryption as global banking platforms, you can rest assured that nobody has access to your secure content.",
                    },
                    {
                        title: "Left 2",
                        content:
                            "Utilising the same 256bit encryption as global banking platforms, you can rest assured that nobody has access to your o",
                    },
                    {
                        title: "Left 3",
                        content:
                            "Utilising the same 256bit encryption as global banking platforms",
                    },
                ],
                right: [
                    {
                        title: "Right 0",
                        content:
                            "Utilising the same 256bit encryption as global banking platforms, you can rest assured that nobody has access to your secure content.",
                    },
                    {
                        title: "Right 1",
                        content:
                            "Utilising the same 256bit encryption as global banking Utilising the same 256bit encryption as global banking platforms, you can rest assured that nobody has access",
                    },
                    {
                        title: "Right 2",
                        content:
                            "Utilising the same 256bit encryption as global banking platforms, you can rest assured that nobody has access to your secure content.",
                    },
                    {
                        title: "Right 3",
                        content:
                            "Utilising the same 256bit encryption as global banking platforms, ",
                    },
                ],
            },
        },
    };
};

export default function Security({ items }: { items: TimelineItems }) {
    return (
        <PageWrapper>
            <Flex
                mb={["8", "12", "16"]}
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

const DesktopSecurityContent = ({ items }: { items: TimelineItems }) => {
    return (
        <Flex
            align="left"
            mb={["12"]}
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
                <Heading
                    fontSize={["32px", "36px", "48px"]}
                    fontWeight="extrabold"
                >
                    <chakra.span color="custom.300">
                        High-grade encryption that
                    </chakra.span>
                    &nbsp;keeps your sensitive info away from prying eyes
                </Heading>

                <Box color="custom.400" fontWeight="600">
                    We&apos;re always working on new features and upgrades to
                    continue to deliver the best experience possible.
                </Box>

                <Flex
                    justify={["center", "center", "left"]}
                    flexDirection={["column", "row"]}
                >
                    <WatchADemo />
                    <Button
                        variant="link"
                        color="custom.400"
                        pt={["4", "0"]}
                        pl={["4", "8"]}
                        onClick={() => router.push(`/links`)}
                    >
                        Create a secure link
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );
};
