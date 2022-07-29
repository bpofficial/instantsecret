import { Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { PageWrapper } from "../components";

export default function FourOhFourPage() {
    const router = useRouter();
    return (
        <PageWrapper center>
            <Flex w="100%" justifyContent="center" alignItems="center">
                <VStack spacing={6} pb="24">
                    <Heading
                        color="custom.300"
                        fontSize={"5xl"}
                        fontWeight="800"
                    >
                        404
                    </Heading>
                    <Heading
                        color="custom.400"
                        fontSize={"2xl"}
                        fontWeight="800"
                    >
                        This page could not be found
                    </Heading>
                    <Button
                        variant="link"
                        color="custom.400"
                        onClick={() => router.push("/")}
                    >
                        Return home
                    </Button>
                </VStack>
            </Flex>
        </PageWrapper>
    );
}
