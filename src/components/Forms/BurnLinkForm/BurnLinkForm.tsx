import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { useRouter } from "next/router";
import { useRef } from "react";
import { ImFire } from "react-icons/im";
import { useTranslation } from "../../../hooks";
import { emit } from "../../../utils";
import { FormButton } from "../../FormButton";

interface BurnLinkFormProps {
    linkId: string;
}

export const BurnLinkForm = ({ linkId }: BurnLinkFormProps) => {
    const translation = useTranslation("BurnLinkForm");
    const formEl = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const onSubmit = (_: FormikValues, { resetForm }: FormikHelpers<any>) => {
        emit("secure_link_burnt");
        formEl.current?.submit();
        setTimeout(resetForm);
    };

    const onCancel = () => {
        emit("secure_link_burn_cancelled");
        router
            .replace(`/links/${linkId}`)
            .then(console.debug)
            .catch(console.debug);
    };

    return (
        <Formik {...{ onSubmit }} initialValues={{} as any}>
            <Form
                action={`/api/links/${linkId}/burn`}
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
                        {translation.SecureLinkId} ({linkId?.slice(0, 8)})
                    </Heading>
                    <FormButton
                        text={translation.ConfirmButton}
                        leftElement={<ImFire />}
                    />
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
