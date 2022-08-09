import {
    Box,
    Button,
    Flex,
    HStack,
    Text,
    VisuallyHidden,
} from "@chakra-ui/react";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
} from "react-icons/ai";
import { PAGE_MAX } from "../../constants";

interface FooterProps {
    showBanner?: boolean;
}

export const Footer = ({ showBanner = false }: FooterProps) => {
    return (
        <Box>
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
