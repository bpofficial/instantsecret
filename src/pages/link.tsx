import {
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    HStack,
    Spacer,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';
import { BasicSetupForm } from '../components';

export default function LinkIndexPage() {
    const [isLargerThan767, isLargerThan1199] = useMediaQuery([
        '(min-width: 767px)',
        '(min-width: 1199px)',
    ]);

    return (
        <Flex
            mt={isLargerThan1199 ? '20' : undefined}
            w="100%"
            px={isLargerThan767 ? '24' : '6'}
            py={isLargerThan767 ? '12' : '4'}
            direction={isLargerThan1199 ? 'row' : 'column-reverse'}
            justifyContent="center"
        >
            <BasicSetupForm />
        </Flex>
    );
}
