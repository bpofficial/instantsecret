import {
    Box,
    chakra,
    Flex,
    Heading,
    Spacer,
    Text,
    VStack,
} from "@chakra-ui/react";
import { PageWrapper } from "../components";

export default function Roadmap() {
    return (
        <PageWrapper align="left">
            <Flex justify={"left"} mb={8} w="100%">
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
    const date = `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`;

    const bg =
        status === "COMPLETED"
            ? "#F3FBEF"
            : status === "IN-PROGRESS"
            ? "#EFF5FB"
            : "#F9F7F0";

    const border =
        status === "COMPLETED"
            ? "#102108"
            : status === "IN-PROGRESS"
            ? "#0F2843"
            : "#2C2611";

    return (
        <Box
            mr="2"
            p="4"
            borderRadius={"md"}
            borderWidth="1px"
            borderColor={border}
            boxShadow="md"
            maxW={["100%", "280px"]}
            minW={["100%", "280px"]}
            height="fit-content"
            {...{ bg }}
        >
            <Heading fontSize={"md"} color={border}>
                {title}
            </Heading>
            <Text mt="4" opacity={0.9} noOfLines={[12, 50]}>
                {description}
            </Text>
            <Text mt="4" opacity="0.75">
                {date}
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
        <Box w="100%">
            <Heading fontSize="2xl" color="custom.400">
                {title}
            </Heading>
            <Flex
                w="100%"
                borderRadius={"md"}
                borderWidth="1px"
                borderColor={"gray.200"}
                p="4"
                maxW="1400px"
                overflow="auto"
                mt="4"
                pb="12"
                {...(items?.length
                    ? {}
                    : {
                          justifyContent: "center",
                          align: "center",
                          minH: ["180px", "220px"],
                      })}
            >
                {items?.length ? (
                    items.map((item, key) => (
                        <RoadmapItem {...item} {...{ status }} key={key} />
                    ))
                ) : (
                    <Box opacity="0.8">No items to show</Box>
                )}
            </Flex>
        </Box>
    );
};

export const RoadmapContent = () => {
    return (
        <Box w="100%">
            <Heading fontSize={{ base: "3xl", md: "5xl" }}>
                <chakra.span color="custom.300">Our Roadmap</chakra.span>
            </Heading>
            <Box>
                <Spacer h={["20px", "40px"]} />
            </Box>
            <VStack align="flext-start" spacing={8}>
                <RoadmapSection
                    title="Complete"
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
                    title="Upcoming"
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
            </VStack>
        </Box>
    );
};
