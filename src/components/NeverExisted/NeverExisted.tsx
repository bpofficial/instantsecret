import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Heading,
    HStack,
    VStack,
    Input,
    Textarea,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from '../../hooks';
import { millisecondsToStr } from '../../utils/humanReadableTimeDiff';

export const NeverExisted = () => {
    const translation = useTranslation('NeverExisted');

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
                value={translation.NeverExistedPlaceholder}
            />
            <CreateNewLinkButton />
        </VStack>
    );
};

const CreateNewLinkButton = () => {
    const translation = useTranslation('NeverExisted');
    const router = useRouter();

    return (
        <Button
            mt="2"
            w="100%"
            borderRadius="md"
            bg="custom.400"
            color="white"
            size="lg"
            fontWeight="bold"
            _active={{ opacity: 0.7 }}
            _hover={{ opacity: 0.7 }}
            onClick={() => router.push('/links')}
            type="submit"
        >
            <HStack>
                <Box>{translation.CreateNewLinkButton}</Box>
                <ArrowForwardIcon mt="2" />
            </HStack>
        </Button>
    );
};
