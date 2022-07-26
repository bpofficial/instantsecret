import {
    Box,
    chakra,
    Flex,
    Heading,
    List,
    ListItem,
    VStack,
} from "@chakra-ui/react";
import { PageWrapper } from "../components";

export default function Roadmap() {
    return (
        <PageWrapper align="left">
            <Flex justify={"left"} mb={8}>
                <RoadmapContent />
            </Flex>
        </PageWrapper>
    );
}

export const RoadmapContent = () => {
    return (
        <Box mt={["8", "4"]} w="100%">
            <VStack align="flext-start" spacing={6}>
                <Heading fontSize={{ base: "3xl", md: "5xl" }}>
                    <chakra.span color="custom.300">Our Roadmap</chakra.span>
                </Heading>

                <List spacing={4}>
                    <ListItem>
                        <Heading size="md">User Accounts</Heading>- Adding user
                        accounts to assist in the deployment of recipient
                        targeting, emailing and user verification for secret
                        viewing.
                    </ListItem>
                    <ListItem>
                        <Heading size="md">Recipient targeting/sharing</Heading>
                        - Implementing recipient targeting to ensure only the
                        intended recipient sees the link and the secret.
                    </ListItem>
                    <ListItem>
                        <Heading size="md">Chromium Extensions</Heading>-
                        Increase productivity with a chrome extension to quickly
                        enter or highlight a secret to share.
                    </ListItem>
                </List>

                {/* <HStack spacing="8">
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
                    <Button variant="link">
                        {translation.copy.securityButton}
                    </Button>
                </HStack> */}
            </VStack>
        </Box>
    );
};
