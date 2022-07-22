import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { Form, Formik, useFormikContext } from 'formik';
import { useRef } from 'react';
import { useTranslation } from '../../hooks';

interface RevealSecretValueFormProps {
    secretKey: string;
}

export const RevealSecretValueForm = ({
    secretKey,
}: RevealSecretValueFormProps) => {
    const translation = useTranslation('RevealSecretValueForm');
    const formEl = useRef<HTMLFormElement>(null);

    const onSubmit = () => {
        formEl.current?.submit();
    };

    return (
        <Formik {...{ onSubmit }} initialValues={{} as any}>
            <Form
                action={`/private/${secretKey}`}
                method="POST"
                ref={formEl}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <VStack align="left" spacing={4} w="100%" maxW={'620px'}>
                    <Heading size="md">{translation.ClickToContinue}</Heading>
                    <ContinueButton />
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
    );
};

const ContinueButton = () => {
    const translation = useTranslation('RevealSecretValueForm');
    const form = useFormikContext<any>();

    return (
        <Button
            w="100%"
            borderRadius="md"
            bg="custom.400"
            color="white"
            size="lg"
            fontWeight="bold"
            _active={{ bg: 'custom.50' }}
            _hover={{ bg: 'custom.50' }}
            onClick={() => form.handleSubmit()}
            type="submit"
        >
            <HStack>
                <Box>{translation.ContinueButton}</Box>
                <ArrowForwardIcon mt="2" />
            </HStack>
        </Button>
    );
};
