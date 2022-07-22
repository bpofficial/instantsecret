import {
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { Form, Formik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { ImFire } from 'react-icons/im';
import { useOrigin, useTranslation } from '../../hooks';
import { copyTextToClipboard } from '../../utils/copyToClipboard';
import { millisecondsToStr } from '../../utils/humanReadableTimeDiff';

interface ShareLinkFormProps {
    linkId: string;
    encrypted: boolean;
    secretKey: string;
    secretValue?: string;
    ttl: number;
    createdAt: string;
}

export const ShareLinkForm = ({
    linkId,
    secretKey,
    secretValue,
    encrypted,
    ttl,
    createdAt,
}: ShareLinkFormProps) => {
    const router = useRouter();
    const translation = useTranslation('ShareLinkForm');
    const formEl = useRef<HTMLFormElement>(null);
    const origin = useOrigin();
    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = () => {
        formEl.current?.submit();
    };

    const link = `${origin}/private/${secretKey}`;

    const expiry = millisecondsToStr(
        new Date(createdAt ?? null).getTime() + ttl
    );

    const onCopy = () => {
        inputRef.current?.select();
        copyTextToClipboard(link);
    };

    const createAnother = () => {
        router.push('/links');
    };

    return (
        <Formik {...{ onSubmit }} initialValues={{} as any}>
            <Form
                action={`/links/${linkId}/burn`}
                method="GET"
                ref={formEl}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <VStack align="left" spacing={4} w="100%" maxW={'620px'}>
                    <Heading size="md">{translation.title}</Heading>
                    <InputGroup>
                        <Input
                            w="100%"
                            maxW={'620px'}
                            borderColor="custom.400"
                            borderWidth="2px"
                            borderRadius="md"
                            alignSelf="center"
                            _hover={{
                                opacity: 1,
                            }}
                            readOnly
                            value={link}
                            onClick={onCopy}
                            ref={inputRef}
                        />
                        <InputRightElement width="16">
                            <Button
                                h="100%"
                                w="100%"
                                bg="custom.400"
                                color="white"
                                borderBottomRightRadius="md"
                                borderTopRightRadius="md"
                                borderBottomLeftRadius="none"
                                borderTopLeftRadius="none"
                                _active={{ bg: 'custom.50' }}
                                _hover={{ bg: 'custom.50' }}
                                onClick={onCopy}
                            >
                                {translation.CopyCTA}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <SecretValue value={secretValue} {...{ encrypted }} />
                    <Box>
                        <Flex justifyContent="space-between">
                            <Box>
                                <chakra.b>{translation.SecureLinkId}</chakra.b>
                                &nbsp; (
                                <chakra.span fontStyle="italic">
                                    {secretKey.slice(0, 8)}
                                </chakra.span>
                                )
                            </Box>
                            <Box>
                                <chakra.b>
                                    {translation.Expiry}&nbsp;{expiry}
                                </chakra.b>
                            </Box>
                        </Flex>
                    </Box>
                    <BurnButton />
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
                        onClick={createAnother}
                    >
                        {translation.CreateAnotherButton}
                    </Button>
                </VStack>
            </Form>
        </Formik>
    );
};

const SecretValue = ({
    value,
    encrypted = false,
}: {
    value?: string;
    encrypted?: boolean;
}) => {
    const translation = useTranslation('ShareLinkForm');
    if (!value || encrypted) {
        return (
            <Input
                w="100%"
                maxW={'620px'}
                borderColor="custom.400"
                borderWidth="2px"
                readOnly
                borderRadius="md"
                alignSelf="center"
                _hover={{
                    opacity: 1,
                }}
                disabled
                value={
                    encrypted
                        ? translation.EncryptedPlaceholder
                        : '******************'
                }
            />
        );
    }
    return (
        <Box
            w="100%"
            borderColor="custom.400"
            borderWidth="2px"
            borderRadius="md"
            alignSelf="center"
        >
            <Textarea
                name="value"
                borderBottomColor="custom.300"
                shadow="none"
                w="100%"
                readOnly
                h="40%"
                minH="200px"
                fontSize="lg"
                bg="color.100"
                p="4"
                borderRadius="4"
                disabled
                value={value}
                _focus={{
                    border: 'none',
                    borderRadius: '4px',
                    boxShadow: 'none',
                    outline: 'none',
                }}
                _disabled={{
                    opacity: 1,
                }}
                _hover={{
                    opacity: 1,
                }}
                style={{
                    border: 'none',
                    borderRadius: '4px',
                    boxShadow: 'none',
                }}
            />
        </Box>
    );
};

const BurnButton = () => {
    const translation = useTranslation('ShareLinkForm');
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
                <ImFire />
                <Box>{translation.BurnButton}</Box>
            </HStack>
        </Button>
    );
};
