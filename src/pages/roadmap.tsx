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

const RoadmapItem = ({ title, description, createdAt }: RoadmapItem) => {
    const date = `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`;
    return (
        <Box
            mr="2"
            p="4"
            borderRadius={"md"}
            borderWidth="1px"
            borderColor={"gray.400"}
            boxShadow="md"
            maxW={["100%", "280px"]}
            minW={["100%", "280px"]}
            height="fit-content"
        >
            <Heading fontSize={"md"}>{title}</Heading>
            <Text mt="4" opacity={0.9} noOfLines={[12, 50]}>
                {description}
            </Text>
            <Text mt="4" opacity="0.75">
                {date}
            </Text>
        </Box>
    );
};

type RoadmapSectionProps = { title: string; items: RoadmapItem[] };
const RoadmapSection = ({ title, items }: RoadmapSectionProps) => {
    return (
        <Box w="100%">
            <Heading fontSize="2xl">{title}</Heading>
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
                        <RoadmapItem {...item} key={key} />
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
                    ]}
                />
                <RoadmapSection
                    title="In Progress"
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
                    items={[
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
