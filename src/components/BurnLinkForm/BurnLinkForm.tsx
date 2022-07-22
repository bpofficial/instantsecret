import { Box, Button, Heading, HStack, VStack } from "@chakra-ui/react";
import { Form, Formik, useFormikContext } from "formik";
import { useRouter } from "next/router";
import { useRef } from "react";
import { ImFire } from "react-icons/im";
import { useTranslation } from "../../hooks";

const ConfirmBurnButton = () => {
    const translation = useTranslation("BurnLinkForm");
    const form = useFormikContext<any>();

    return (
        <Button
            w="100%"
            borderRadius="md"
            bg="custom.400"
            color="white"
            size="lg"
            fontWeight="bold"
            _active={{ bg: "custom.50" }}
            _hover={{ bg: "custom.50" }}
            onClick={() => form.handleSubmit()}
            type="submit"
        >
            <HStack>
                <ImFire />
                <Box>{translation.ConfirmButton}</Box>
            </HStack>
        </Button>
    );
};

interface BurnLinkFormProps {
    linkId: string;
}

export const BurnLinkForm = ({ linkId }: BurnLinkFormProps) => {
    const translation = useTranslation("BurnLinkForm");
    const formEl = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const onSubmit = () => {
        formEl.current?.submit();
    };

    const onCancel = () => {
        router.replace(`/links/${linkId}/`);
    };

    return (
        <Formik {...{ onSubmit }} initialValues={{} as any}>
            <Form
                action={`/links/${linkId}/burn`}
                method="POST"
                ref={formEl}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <VStack align="left" spacing={4} w="100%" maxW={"620px"}>
                    <Heading size="md">
                        {translation.SecureLinkId} ({linkId?.slice(0, 8)})
                    </Heading>
                    <ConfirmBurnButton />
                    <Box
                        textAlign="center"
                        fontSize="sm"
                        fontStyle="italic"
                        color="custom.400"
                    >
                        {translation.Disclaimer}
                    </Box>
                    <Button
                        variant="link"
                        textDecoration="underline"
                        color="custom.400"
                        onClick={onCancel}
                    >
                        {translation.CancelButton}
                    </Button>
                </VStack>
            </Form>
        </Formik>
    );
};
