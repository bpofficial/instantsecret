import {
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    HStack,
    Spacer,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiEdit, FiSend } from "react-icons/fi";
import { ImFire } from "react-icons/im";
import { CreateLinkForm, PageWrapper } from "../components";
import { useTranslation } from "../hooks";

export default function Index() {
    return (
        <>
            <PageWrapper>
                <Flex
                    direction={[
                        "column-reverse",
                        "column-reverse",
                        "column-reverse",
                        "row",
                    ]}
                    justify={["center", "center", "center", "space-between"]}
                    mb={8}
                >
                    <IndexCopyContent />
                    <Box maxW="520px" w="100%">
                        <CreateLinkForm />
                    </Box>
                </Flex>
            </PageWrapper>
            <Box>
                <Spacer height={["32px", "72px"]} />
            </Box>
            <Flex
                w="100%"
                bg="custom.400"
                p={["6", "12"]}
                align="center"
                justify="center"
            >
                <Flex
                    color="white"
                    justify={"space-around"}
                    maxW="1400px"
                    w="100%"
                    align="center"
                    flexDirection={["column", "column", "column", "row"]}
                >
                    <BannerItem
                        icon={<FiEdit />}
                        title="Create"
                        content="Paste in your private content and create your secret link"
                    />
                    <BannerItem
                        icon={<FiSend />}
                        title="Share"
                        content="Share your link with anyone via email or private message"
                    />
                    <BannerItem
                        icon={<ImFire />}
                        title="Burn"
                        content="Once your secret link is used it's then destroyed forever"
                    />
                </Flex>
            </Flex>
        </>
    );
}

type BannerItemProps = { icon: any; title: string; content: string };
const BannerItem = ({ icon, title, content }: BannerItemProps) => (
    <VStack maxW="60" mx={["0", "0", "12"]} my={["6", "6", "0"]} align="center">
        <Box fontSize={"5xl"}>{icon}</Box>
        <Box>
            <Heading fontSize={"3xl"}>{title}</Heading>
        </Box>
        <Box opacity={0.8} fontSize="sm" textAlign="center">
            {content}
        </Box>
    </VStack>
);

export const IndexCopyContent = () => {
    const translation = useTranslation("index");
    const router = useRouter();

    return (
        <Box maxW={{ base: "100%", lg: "50%" }} mt={["8", "4"]}>
            <VStack align="flext-start" spacing={6}>
                <Heading fontSize={{ base: "3xl", md: "5xl" }}>
                    <chakra.span color="custom.300">
                        {translation.copy.coloredTitle}
                    </chakra.span>
                    &nbsp;
                    {translation.copy.remainingTitle}
                </Heading>

                <Box color="custom.400" fontWeight="600">
                    {translation.copy.subtitle}
                </Box>

                <HStack spacing="8">
                    <Button
                        size="lg"
                        bg="custom.400"
                        color="white"
                        fontWeight="bold"
                        px="8"
                        py="6"
                        _hover={{ opacity: 0.7 }}
                        _active={{ opacity: 0.7 }}
                    >
                        {translation.copy.ctaButton}
                    </Button>
                    <Button
                        variant="link"
                        onClick={() => router.push(`/security`)}
                    >
                        {translation.copy.securityButton}
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};
