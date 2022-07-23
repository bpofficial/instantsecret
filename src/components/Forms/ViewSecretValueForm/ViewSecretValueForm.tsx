import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Heading,
    VStack,
    Textarea,
} from '@chakra-ui/react';
import { useTranslation } from '../../../hooks';
import {FormButton} from "../../FormButton";
import {useRouter} from "next/router";

interface ViewSecretValueFormProps {
    secretValue: string;
}

export const ViewSecretValueForm = ({
    secretValue,
}: ViewSecretValueFormProps) => {
    const router = useRouter()
    const translation = useTranslation('ViewSecretValueForm');

    return (
        <VStack align="left" spacing={4} w="100%" maxW={'620px'}>
            <Heading size="md">{translation.Title}</Heading>
            <Textarea
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
                value={secretValue}
            />
            <Box
                textAlign="center"
                fontSize="sm"
                fontStyle="italic"
                color="custom.400"
            >
                {translation.Disclaimer}
            </Box>
            <FormButton
                text={translation.CreateNewLinkButton}
                rightElement={<ArrowForwardIcon mt="2" />}
                onSubmit={() => router.push('/links')}
            />
        </VStack>
    );
};
