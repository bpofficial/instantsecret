import {
    AspectRatio,
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Spacer,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiEdit, FiSend } from "react-icons/fi";
import { ImFire } from "react-icons/im";
import { CreateLinkForm, PageWrapper } from "../components";
import { PAGE_MAX } from "../constants";
import { useTranslation } from "../hooks";

export default function Index() {
    return (
        <>
            <PageWrapper>
                <Flex
                    direction={["column", "column", "column", "row"]}
                    justify={["center", "center", "center", "space-between"]}
                    mb={["8", "12", "16"]}
                    mt={["4", "8", "8", "24", "36"]}
                    align={["center", "center", "center"]}
                    maxW={"100%"}
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
            <Box>
                <Spacer height={["20px", "32px", "32px"]} />
            </Box>
            <Flex
                w="100%"
                bg="custom.400"
                p={["6", "16"]}
                align="center"
                justify="center"
                mb={["-50px", "-30px", "-20px", "0px"]}
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
        </>
    );
}

export const IndexCopyContent = () => {
    const translation = useTranslation("index");
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box maxW={["100%", "100%", "100%", "50%"]} mb={["12"]}>
            <VStack align="flext-start" spacing={6}>
                <Heading
                    fontSize={["32px", "36px", "48px"]}
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
                        <Button
                            size="lg"
                            bg="custom.400"
                            color="white"
                            fontWeight="bold"
                            px="8"
                            py="6"
                            _hover={{ bg: "custom.50" }}
                            onClick={onOpen}
                        >
                            {translation.copy.ctaButton}
                        </Button>
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
            <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalCloseButton
                        position="absolute"
                        top="10px"
                        right="10px"
                    />
                    <ModalBody p="0">
                        <AspectRatio>
                            <iframe
                                title="demo"
                                src="https://www.youtube.com/embed/GpMpadbwvsg"
                                allowFullScreen
                            />
                        </AspectRatio>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

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
