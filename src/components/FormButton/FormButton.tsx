import {Box, Button, ButtonProps, HStack, useBoolean} from "@chakra-ui/react";
import {useFormikContext} from "formik";

interface FormButtonProps {
    text: string;
    leftElement?: JSX.Element | null;
    rightElement?: JSX.Element | null;

    /**
     * Only required if not inside a Formik form already.
     */
    onSubmit?: () => void;
    buttonProps?: ButtonProps
}

export const FormButton = ({ text = '', leftElement = null, rightElement = null, onSubmit, buttonProps = {} }: FormButtonProps) => {
    const [isLoading, loading] = useBoolean(false)
    const form = useFormikContext()

    const onClick = () => {
        loading.on();
        onSubmit?.() || form?.handleSubmit?.();
        setTimeout(loading.off, 5000);
    }

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
            {...{onClick, isLoading}}
            {...buttonProps}
        >
            <HStack>
                {leftElement}
                <Box>{text}</Box>
                {rightElement}
            </HStack>
        </Button>
    )
}
