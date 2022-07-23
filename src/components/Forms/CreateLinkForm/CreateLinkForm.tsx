import {
    Box,
    Button,
    Heading,
    HStack,
    Textarea, useBoolean,
    useMediaQuery,
    VStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useTranslation } from "../../../hooks";
import { PassphraseInput, PassphraseLabel } from "./Inputs/Passphrase";
import { LifetimeInput, LifetimeLabel } from "./Inputs/Lifetime";
import {Formik, useFormikContext, Form, FormikHelpers, FormikValues} from "formik";
import { useRef } from "react";
import {FormButton} from "../../FormButton";

export const CreateLinkForm = () => {
    const translation = useTranslation("CreateLinkForm");
    const formEl = useRef<HTMLFormElement>(null);

    const onSubmit = (values: FormikValues, { resetForm }: FormikHelpers<any>) => {
        formEl.current?.submit();
        setTimeout(resetForm)
    };

    return (
        <Formik {...{ onSubmit }} initialValues={{} as any}>
            {({ handleChange, values }) => (
                <Form
                    action="/api/links"
                    method="POST"
                    ref={formEl}
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <VStack w="100%" spacing={4}>
                        <Box
                            w="100%"
                            maxW={"620px"}
                            borderColor="custom.400"
                            borderWidth="2px"
                            borderRadius="md"
                            alignSelf="center"
                        >
                            <Textarea
                                name="value"
                                placeholder={translation.inputPlaceholder}
                                borderBottomColor="custom.300"
                                shadow="none"
                                w="100%"
                                h="40%"
                                minH="200px"
                                fontSize="lg"
                                bg="color.100"
                                p="4"
                                borderRadius="4"
                                onChange={handleChange}
                                value={values["value"] ?? ""}
                                _focus={{
                                    border: "none",
                                    borderRadius: "4px",
                                    boxShadow: "none",
                                    outline: "none",
                                }}
                                style={{
                                    border: "none",
                                    borderRadius: "4px",
                                    boxShadow: "none",
                                }}
                            />
                            <Box w="100%" h="2px" bg="custom.400" />
                            <Box>
                                <Heading
                                    size="sm"
                                    textAlign="center"
                                    p="6"
                                    color="custom.400"
                                >
                                    {translation.privacyOptionsTitle}
                                </Heading>
                                <PrivacyOptionInputs />
                            </Box>
                            <FormButton
                                text={translation.createLinkButton}
                                rightElement={<ArrowForwardIcon mt="2" />}
                                buttonProps={{
                                    borderRadius: "0"
                                }}
                            />
                        </Box>
                        <Box fontSize="sm" fontStyle="italic">
                            {translation.disclaimer}
                        </Box>
                    </VStack>
                </Form>
            )}
        </Formik>
    );
};

const PrivacyOptionInputs = () => {
    const [isLargerThan767] = useMediaQuery(["(min-width: 767px)"], {
        fallback: [true],
        ssr: true,
    });

    const ContainerComponent = isLargerThan767 ? HStack : VStack;
    const SubComponent = isLargerThan767 ? VStack : HStack;
    const FirstComponent = isLargerThan767 ? (
        <>
            <Box p="1" mt="1">
                <PassphraseLabel />
            </Box>
            <Box p="1" textAlign="right">
                <LifetimeLabel />
            </Box>
        </>
    ) : (
        <PassphraseInput />
    );

    const SecondComponent = isLargerThan767 ? (
        <>
            <PassphraseInput />
            <LifetimeInput />
        </>
    ) : (
        <LifetimeInput />
    );

    return (
        <ContainerComponent
            spacing="1"
            justifyContent={isLargerThan767 ? "center" : undefined}
            px={[4, 6]}
            pb={[2, 6]}
            w="100%"
        >
            <SubComponent
                w={isLargerThan767 ? undefined : "100%"}
                align={isLargerThan767 ? "flex-end" : undefined}
            >
                {FirstComponent}
            </SubComponent>
            <SubComponent
                w={isLargerThan767 ? "60%" : "100%"}
                align={isLargerThan767 ? "flex-end" : undefined}
            >
                {SecondComponent}
            </SubComponent>
        </ContainerComponent>
    );
};