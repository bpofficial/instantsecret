import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Text,
    VisuallyHidden,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
} from "react-icons/ai";
import { FiEdit, FiSend } from "react-icons/fi";
import { ImFire } from "react-icons/im";
import { PAGE_MAX } from "../../constants";

interface FooterProps {
    showBanner?: boolean;
}

export const Footer = ({ showBanner = false }: FooterProps) => {
    const router = useRouter();
    return (
        <Box marginTop={"auto"}>
            <Flex
                textAlign="center"
                px="4"
                py="4"
                bg="custom.400"
                color="white"
                justifyContent={"center"}
                align="center"
                direction="column"
            >
                <Flex
                    w="100%"
                    bg="custom.400"
                    p={["6", "16"]}
                    pb={["8", "24"]}
                    align="center"
                    justify="center"
                    display={showBanner ? "flex" : "none"}
                >
                    <Flex
                        color="white"
                        justify={"space-around"}
                        maxW={PAGE_MAX}
                        w="100%"
                        align="center"
                        flexDirection={["column", "column", "column", "row"]}
                    >
                        <BannerItem
                            icon={<FiEdit />}
                            title="Create"
                            content="Paste in your private content and create your secure link"
                        />
                        <BannerItem
                            icon={<FiSend />}
                            title="Share"
                            content="Share your link with anyone via email or private message"
                        />
                        <BannerItem
                            icon={<ImFire />}
                            title="Burn"
                            content="Once your secure link is used it's then destroyed forever"
                        />
                    </Flex>
                </Flex>
                <Flex
                    justify={"space-between"}
                    flexDirection={["column", "column", "row"]}
                    w="100%"
                    maxW={PAGE_MAX}
                    align="center"
                >
                    <HStack justify="center" p="2">
                        <Button
                            as="a"
                            href="https://facebook.com/whitepeakdigital"
                            variant="link"
                            color="white"
                            fontSize={"sm"}
                            fontWeight="500"
                            minW="auto"
                        >
                            <AiFillFacebook />
                            <VisuallyHidden>
                                White Peak Digital Facebook Link
                            </VisuallyHidden>
                        </Button>
                        <Button
                            as="a"
                            href="https://instagram.com/whitepeakdigital"
                            variant="link"
                            color="white"
                            fontSize={"sm"}
                            fontWeight="500"
                            minW="auto"
                        >
                            <AiFillInstagram />
                            <VisuallyHidden>
                                White Peak Digital Instagram Link
                            </VisuallyHidden>
                        </Button>
                        <Button
                            as="a"
                            href="https://linkedin.com/company/whitepeakdigital"
                            variant="link"
                            color="white"
                            fontSize={"sm"}
                            fontWeight="500"
                            minW="auto"
                        >
                            <AiFillLinkedin />
                            <VisuallyHidden>
                                White Peak Digital Linked-In Link
                            </VisuallyHidden>
                        </Button>
                        <Button
                            as="a"
                            href="mailto:hello@instantsecurelink.com"
                            variant="link"
                            color="white"
                            fontSize={"sm"}
                            fontWeight="500"
                        >
                            <Text>hello@instantsecurelink.com</Text>
                        </Button>
                    </HStack>
                    <Text p="2" fontSize={"sm"}>
                        © 2022&nbsp;
                        <Button
                            as="a"
                            href="https://whitepeakdigital.com"
                            variant="link"
                            color="white"
                            fontSize={"sm"}
                            fontWeight="600"
                        >
                            White Peak Digital
                        </Button>
                        &nbsp;Pty Ltd. All rights reserved.
                    </Text>
                    <HStack p="2" justify="center">
                        <Button
                            variant="link"
                            fontSize="sm"
                            fontWeight="500"
                            color="white"
                            as="a"
                            href="/termsandconditions"
                        >
                            <Text>Terms & Conditions</Text>
                        </Button>
                        <Button
                            variant="link"
                            fontSize="sm"
                            fontWeight="500"
                            color="white"
                            as="a"
                            href="/privacypolicy"
                        >
                            <Text>Privacy Policy</Text>
                        </Button>
                    </HStack>
                </Flex>
            </Flex>
        </Box>
    );
};

type BannerItemProps = { icon: any; title: string; content: string };
const BannerItem = ({ icon, title, content }: BannerItemProps) => (
    <VStack maxW="60" mx={["0", "0", "12"]} my={"6"} align="center">
        <Box fontSize={"5xl"}>{icon}</Box>
        <Box>
            <Heading fontSize={"3xl"}>{title}</Heading>
        </Box>
        <Box opacity={0.8} fontSize="sm" textAlign="center">
            {content}
        </Box>
    </VStack>
);
