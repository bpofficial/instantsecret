import { Box, Button, ButtonProps, HStack, useBoolean } from "@chakra-ui/react";
import { Formik, FormikValues, useFormikContext } from "formik";

interface FormButtonProps {
    text: string;
    leftElement?: JSX.Element | null;
    rightElement?: JSX.Element | null;

    /**
     * Only required if not inside a Formik form already.
     */
    onSubmit?: () => void;
    buttonProps?: ButtonProps;
    validate?: (values: FormikValues) => Promise<void>;
}

export const FormButton = ({
    text = "",
    leftElement = null,
    rightElement = null,
    onSubmit,
    validate = () => Promise.resolve(),
    buttonProps = {},
}: FormButtonProps) => {
    const [isLoading, loading] = useBoolean(false);
    const form = useFormikContext<any>();

    const onClick = () => {
        validate(form?.values)
            .then(() => {
                loading.on();
                onSubmit?.() || form?.handleSubmit?.();
                setTimeout(loading.off, 5000);
            })
            .catch(() => {
                // do nothing
            });
    };

    return (
        <Button
            mt="2"
            w="100%"
            borderRadius="md"
            bg="custom.400"
            color="white"
            size="lg"
            fontWeight="bold"
            _active={{ bg: "custom.50" }}
            _hover={{ bg: "custom.50" }}
            type="submit"
            {...{ onClick, isLoading }}
            {...buttonProps}
        >
            <HStack>
                {leftElement}
                <Box>{text}</Box>
                {rightElement}
            </HStack>
        </Button>
    );
};

export const NextButton = (props: FormButtonProps) => {
    return (
        <Formik initialValues={{}} onSubmit={() => {}}>
            <FormButton {...props} />
        </Formik>
    );
};
