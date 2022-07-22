import { Flex, useMediaQuery } from '@chakra-ui/react';

export const PageWrapper = ({ children }: any) => {
    const [isLargerThan767, isLargerThan1199] = useMediaQuery(
        ['(min-width: 767px)', '(min-width: 1199px)'],
        { fallback: [false, true], ssr: true }
    );

    return (
        <Flex
            mt={isLargerThan1199 ? '12' : undefined}
            w="100%"
            px={isLargerThan767 ? '24' : '6'}
            py={isLargerThan767 ? '12' : '4'}
            direction={isLargerThan1199 ? 'row' : 'column-reverse'}
            justifyContent="space-between"
        >
            {children}
        </Flex>
    );
};
