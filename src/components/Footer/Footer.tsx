import { EmailIcon } from "@chakra-ui/icons";
import { Button, Flex, HStack, Spacer, Text } from "@chakra-ui/react";

interface FooterProps {}

export const Footer = ({}: FooterProps) => {
    return (
        <Flex
            textAlign="center"
            px="4"
            py="2"
            marginTop={"auto"}
            bg="custom.400"
            color="white"
            justifyContent={"center"}
        >
            <Flex
                justify={"space-between"}
                flexDirection={["column", "row"]}
                w="100%"
                maxW="1400px"
            >
                <Button
                    as="a"
                    href="mailto:hello@instantsecurelink.com"
                    variant="link"
                    color="white"
                    fontSize={"sm"}
                    p={["2", "0"]}
                >
                    <HStack align="center">
                        <EmailIcon mt="0.5" />
                        <Text>hello@instantsecurelink.com</Text>
                    </HStack>
                </Button>
                <Spacer height={["12px", "0px"]} />
                <Text fontSize={"sm"} p={["2", "0"]}>
                    Ⓒ 2022 White Peak Digital Pty Ltd. All rights reserved.
                </Text>
            </Flex>
        </Flex>
    );
};
