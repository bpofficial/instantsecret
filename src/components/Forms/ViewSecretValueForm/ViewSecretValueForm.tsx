import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Textarea, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "../../../hooks";
import { FormButton } from "../../FormButton";

interface ViewSecretValueFormProps {
    secretValue: string;
}

export const ViewSecretValueForm = ({
    secretValue,
}: ViewSecretValueFormProps) => {
    const router = useRouter();
    const translation = useTranslation("ViewSecretValueForm");

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>View Secure Content - Instant Secure Link</title>
                <meta
                    name="title"
                    content="View Secure Content - Instant Secure Link"
                />
            </Head>
            <Formik onSubmit={() => {}} initialValues={{}}>
                <Flex w="100%" justifyContent="center" alignItems="center">
                    <VStack align="left" spacing={4} w="100%" maxW={"620px"}>
                        <Heading size="md">{translation.Title}</Heading>
                        <Textarea
                            w="100%"
                            maxW={"620px"}
                            borderColor="custom.400"
                            borderWidth="2px"
                            borderRadius="md"
                            alignSelf="center"
                            _hover={{
                                opacity: 1,
                            }}
                            readOnly
                            value={secretValue}
                        />
                        <FormButton
                            text={translation.CreateNewLinkButton}
                            rightElement={<ArrowForwardIcon mt="2" />}
                            onSubmit={() => router.push("/links")}
                        />
                        <Box
                            textAlign="center"
                            fontSize="sm"
                            fontStyle="italic"
                            color="custom.400"
                        >
                            {translation.Disclaimer}
                        </Box>
                    </VStack>
                </Flex>
            </Formik>
        </>
    );
};
