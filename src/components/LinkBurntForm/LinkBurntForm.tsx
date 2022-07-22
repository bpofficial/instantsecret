import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Heading,
    HStack,
    VStack,
    Textarea,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslation } from '../../hooks';

interface LinkBurntFormProps {
    linkId: string;
    burntAt: string;
}

export const LinkBurntForm = ({ linkId, burntAt }: LinkBurntFormProps) => {
    const translation = useTranslation('LinkBurntForm');

    return (
        <VStack align="left" spacing={4} w="100%" maxW={'620px'}>
            <Heading size="md">
                {translation.Title} ({linkId?.slice(0, 8) ?? '??'})
            </Heading>
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
                value={translation.LinkBurntPlaceholder}
            />
            <CreateNewLinkButton />
        </VStack>
    );
};

const CreateNewLinkButton = () => {
    const translation = useTranslation('LinkBurntForm');
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
