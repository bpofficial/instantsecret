import {
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    Spacer,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PageWrapper } from "../components";

export default function Roadmap() {
    return (
        <PageWrapper>
            <Flex
                mb={["8", "12", "16"]}
                mt={["4", "8", "8", "36"]}
                direction="column"
                maxW={"100%"}
                w="100%"
            >
                <Flex
                    direction={["column", "column", "column", "row"]}
                    justify={["center", "center", "center", "space-between"]}
                    align={["center", "center", "center"]}
                    maxW={"100%"}
                    w="100%"
                >
                    <RoadmapTitle />
                    <VStack
                        maxW={["100%", "100%", "100%", "40%"]}
                        w="100%"
                        align="left"
                        spacing={"4"}
                        mb={["12"]}
                    >
                        <Heading fontSize={"2xl"} color="custom.400">
                            Up Next
                        </Heading>
                        <Box
                            p="6"
                            borderRadius={"md"}
                            boxShadow="md"
                            borderWidth={"1px"}
                            borderColor=""
                            w="100%"
                        >
                            <VStack align="left">
                                <Heading fontSize={"md"} color="custom.400">
                                    User Accounts
                                </Heading>
                                <Text color="custom.400">
                                    Adding user accounts to assist in the
                                    deployment of recipient targeting, emailing
                                    and user verification for secret viewing.
                                </Text>
                            </VStack>
                        </Box>
                    </VStack>
                </Flex>
                <RoadmapContent />
            </Flex>
        </PageWrapper>
    );
}

type RoadmapItem = {
    title: string;
    description: string;
    status?: "COMPLETED" | "IN-PROGRESS" | "TODO";
    createdAt: Date;
};

const RoadmapItem = ({
    title,
    description,
    createdAt,
    status,
}: RoadmapItem) => {
    const bg =
        status === "COMPLETED"
            ? "#1d35570d"
            : status === "IN-PROGRESS"
            ? "#1d35571a"
            : "#1d355726";

    return (
        <Box
            mr="2"
            p="6"
            borderRadius={"md"}
            height="fit-content"
            {...{ bg }}
            minW={["100%", "50%", "33%", "100%"]}
            maxW={["100%", "50%", "33%", "100%"]}
        >
            <Heading fontSize={"md"} color="custom.400">
                {title}
            </Heading>
            <Text mt="2" color="custom.400" noOfLines={[12, 50]}>
                {description}
            </Text>
        </Box>
    );
};

type RoadmapSectionProps = {
    title: string;
    items: RoadmapItem[];
    status: RoadmapItem["status"];
};
const RoadmapSection = ({ title, items, status }: RoadmapSectionProps) => {
    return (
        <Box
            w="100%"
            p="6"
            borderRadius={"md"}
            borderWidth="1px"
            borderColor={"gray.200"}
            boxShadow="md"
            maxH={["auto", "auto", "auto", "700px"]}
            minH={["auto", "auto", "auto", "700px"]}
            overflowY="auto"
        >
            <Heading fontSize="2xl" color="custom.400">
                {title}
            </Heading>
            <Stack
                overflow="auto"
                mt="4"
                direction={["row", "row", "row", "column"]}
                spacing="4"
                {...(items?.length
                    ? {}
                    : {
                          justifyContent: "center",
                          align: "center",
                      })}
            >
                {items?.length ? (
                    items.map((item, key) => (
                        <RoadmapItem {...item} {...{ status }} key={key} />
                    ))
                ) : (
                    <Box opacity="0.8">No items to show</Box>
                )}
            </Stack>
        </Box>
    );
};

export const RoadmapContent = () => {
    return (
        <Flex w="100%" direction="column" justify={"center"} align="center">
            <Box>
                <Spacer h={["0", "0", "0", "40"]} />
            </Box>
            <Stack
                align="flex-start"
                justify="center"
                direction={["column", "column", "column", "row"]}
                maxW={"100%"}
                spacing={[4, 4, 8, 24]}
            >
                <RoadmapSection
                    title="Completed"
                    status="COMPLETED"
                    items={[
                        {
                            title: "Banner",
                            description:
                                "Add a banner to keep track of the total number of links created since we launched",
                            createdAt: new Date("08/04/2022"),
                        },
                        {
                            title: "Passphrases",
                            description:
                                "Implemented the ability to add a passphrase to a secured link in order to augment the secret's encryption further.",
                            createdAt: new Date("08/02/2022"),
                        },
                        {
                            title: "Roadmap",
                            description:
                                "Create this roadmap page to keep our users up-to-date with changes to the Instant Secure Link product",
                            createdAt: new Date("08/02/2022"),
                        },
                        {
                            title: "Instant Secure Link",
                            description: "Create the Instant Secure Link tool!",
                            createdAt: new Date("08/01/2022"),
                        },
                    ]}
                />
                <RoadmapSection
                    title="In Progress"
                    status="IN-PROGRESS"
                    items={[
                        {
                            title: "User Accounts",
                            description:
                                "Adding user accounts to assist in the deployment of recipient targeting, emailing and user verification for secret viewing.",
                            createdAt: new Date("08/20/2022"),
                        },
                    ]}
                />
                <RoadmapSection
                    title="Planned"
                    status="TODO"
                    items={[
                        {
                            title: "Two-Factor Authentication",
                            description:
                                "Increasing security by requiring 2FA when viewing a secret that has been shared with you. 2FA will be setup in your account settings and will be provided in options such as a 3rd party authenticator app, email, and SMS.",
                            createdAt: new Date("08/20/2022"),
                        },
                        {
                            title: "Recipient targeting/sharing",
                            description:
                                "Implementing recipient targeting to ensure only the intended recipient sees the link and the secret.",
                            createdAt: new Date("08/20/2022"),
                        },
                        {
                            title: "Chromium Extensions",
                            description:
                                "Increase productivity with a chrome extension to quickly enter or highlight a secret to share.",
                            createdAt: new Date("08/20/2022"),
                        },
                    ]}
                />
            </Stack>
        </Flex>
    );
};

const RoadmapTitle = () => {
    const router = useRouter();

    return (
        <Box maxW={["100%", "100%", "100%", "40%"]} mb={["12"]}>
            <VStack align="flext-start" spacing={[6, 8]}>
                <Heading
                    fontSize={["36px", "36px", "36px"]}
                    fontWeight="extrabold"
                >
                    <chakra.span color="custom.300">
                        Take a look at what features
                    </chakra.span>
                    &nbsp;we're working on next
                </Heading>

                <Box color="custom.400" fontWeight="600">
                    We're always working on new features and upgrades to
                    continue to deliver the best experience possible.
                </Box>

                <Flex
                    w="100%"
                    justify={["left"]}
                    maxW={["100%", "92%"]}
                    flexDirection={["column", "row"]}
                >
                    <Button
                        size="lg"
                        bg="custom.400"
                        color="white"
                        fontWeight="bold"
                        px="8"
                        py="6"
                        _hover={{ bg: "custom.50" }}
                        onClick={() => router.push(`/links`)}
                    >
                        CREATE A SECURE LINK
                    </Button>
                    <Button
                        variant="link"
                        color="custom.400"
                        pt={["4", "0"]}
                        pl={["4", ")"]}
                        onClick={() => router.push(`/security`)}
                    >
                        How is it secured?
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );
};
