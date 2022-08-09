import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    Box,
    FormControl,
    FormErrorMessage,
    Heading,
    Input,
    VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRef } from "react";
import { useTranslation } from "../../../hooks";
import { emit } from "../../../utils";
import { FormButton } from "../../FormButton";

interface RevealSecretValueFormProps {
    secretKey: string;
    encrypted: boolean;
    error?: {
        code: number;
        error?: string;
        description?: string;
        meta?: Record<string, any>;
    };
}

export const RevealSecretValueForm = ({
    secretKey,
    encrypted,
    error,
}: RevealSecretValueFormProps) => {
    const translation = useTranslation("RevealSecretValueForm");
    const formEl = useRef<HTMLFormElement>(null);

    const onSubmit = () => {
        emit("secure_content_opened");
        formEl.current?.submit();
    };

    const isFieldError = !!error?.meta?.fieldError;

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
                <title>Confirm Open Content - Instant Secure Link</title>
                <meta
                    name="title"
                    content="Confirm Open Content - Instant Secure Link"
                />
            </Head>
            <Formik {...{ onSubmit }} initialValues={{} as any}>
                <Form
                    action={`/private/${secretKey}/`}
                    method="POST"
                    ref={formEl}
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <VStack align="left" spacing={4} w="100%" maxW={"620px"}>
                        <Heading size="md">
                            {encrypted
                                ? translation.EnterPassphrase
                                : translation.ClickToContinue}
                        </Heading>

                        {encrypted ? (
                            <FormControl isInvalid={isFieldError}>
                                <Input
                                    name="passphrase"
                                    placeholder={
                                        translation.EnterPassphrasePlaceholder
                                    }
                                />
                                {isFieldError ? (
                                    <FormErrorMessage>
                                        {error?.description}
                                    </FormErrorMessage>
                                ) : (
                                    <></>
                                )}
                            </FormControl>
                        ) : (
                            <></>
                        )}

                        <FormButton
                            text={translation.ContinueButton}
                            rightElement={<ArrowForwardIcon mt="2" />}
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
                </Form>
            </Formik>
        </>
    );
};
