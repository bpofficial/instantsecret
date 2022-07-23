import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRef } from 'react';
import { useTranslation } from '../../../hooks';
import {FormButton} from "../../FormButton";

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
    );
};
