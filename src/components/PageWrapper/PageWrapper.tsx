import { Flex, useMediaQuery } from '@chakra-ui/react';

export const PageWrapper = ({ children }: any) => {
    return (
        <Flex
            mt={{ base: '12', sm: '0' }}
            w="100%"
            px={{ base: 24, sm: 6 }}
            py={{ base: 12, sm: 4 }}
            direction={{ base: 'row', sm: 'column-reverse' }}
            justifyContent={'space-between'}
            alignItems="center"
        >
            {children}
        </Flex>
    );
};
