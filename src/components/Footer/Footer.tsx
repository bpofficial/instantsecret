import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
} from "react-icons/ai";
import { PAGE_MAX } from "../../constants";

interface FooterProps {}

export const Footer = ({}: FooterProps) => {
    const router = useRouter();
    return (
        <Flex
            textAlign="center"
            px="4"
            py="4"
            mt={["50px", "30px", "20px", "0px"]}
            bg="custom.400"
            color="white"
            justifyContent={"center"}
        >
            <Flex
                justify={"space-between"}
                flexDirection={["column", "column", "row"]}
                w="100%"
                maxW={PAGE_MAX}
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
                <Text p="1" fontSize={"sm"}>
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
                <HStack justify="center" p="2">
                    <Button
                        variant="link"
                        fontSize="sm"
                        fontWeight="500"
                        color="white"
                        onClick={() => router.push(`/termsandconditions`)}
                    >
                        <Text>Terms & Conditions</Text>
                    </Button>
                    <Button
                        variant="link"
                        fontSize="sm"
                        fontWeight="500"
                        color="white"
                        onClick={() => router.push(`/privacypolicy`)}
                    >
                        <Text>Privacy Policy</Text>
                    </Button>
                </HStack>
            </Flex>
        </Flex>
    );
};
