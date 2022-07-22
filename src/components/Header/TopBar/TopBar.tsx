import {
    Box,
    Button,
    HStack,
    useColorModeValue,
    useMediaQuery,
    VisuallyHidden,
} from '@chakra-ui/react';
import { chakra, Flex } from '@chakra-ui/react';
import { useLocaleLink, useTranslation } from '../../../hooks';
import Image from 'next/image';

export const TopBar = () => {
    const localeLink = useLocaleLink();
    const translation = useTranslation('TopBar');
    const bg = useColorModeValue('white', 'gray.800');
    const [isLargerThan767] = useMediaQuery(['(min-width: 767px)'], {
        fallback: [true],
        ssr: true,
    });

    return (
        <>
            <chakra.header
                bg={bg}
                w="full"
                px={isLargerThan767 ? 16 : 6}
                py={4}
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mx="auto"
                >
                    <Flex>
                        <chakra.a
                            href="/"
                            title="Instant Secret"
                            display="flex"
                            alignItems="center"
                        >
                            <Box mt="1">
                                <Image
                                    src="/assets/logo.svg"
                                    width="25px"
                                    height="25px"
                                    alt={translation.logoAlt}
                                />
                            </Box>
                            <VisuallyHidden>
                                {translation.logoHiddenText}
                            </VisuallyHidden>
                            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                                {translation.logoText}
                            </chakra.h1>
                        </chakra.a>
                    </Flex>
                    <HStack display="flex" alignItems="center" spacing={1}>
                        <HStack
                            spacing={1}
                            mr={1}
                            color="brand.500"
                            display={{
                                base: 'none',
                                md: 'inline-flex',
                            }}
                        >
                            <Button
                                variant="ghost"
                                fontWeight="normal"
                                as="a"
                                href={localeLink`/security`}
                                rel="noopener"
                            >
                                {translation.SecurityLink}
                            </Button>
                            <Button
                                variant="ghost"
                                fontWeight="normal"
                                as="a"
                                href={localeLink`/roadmap`}
                                rel="noopener"
                            >
                                {translation.RoadMapLink}
                            </Button>
                            <Button
                                variant="ghost"
                                fontWeight="normal"
                                as="a"
                                href={localeLink`/links`}
                                rel="noopener"
                            >
                                {translation.CreateLink}
                            </Button>
                            {/* <Button
                                variant="ghost"
                                fontWeight="normal"
                                as="a"
                                href="/signin"
                                rel="noopener"
                            >
                                {translation.SignInLink}
                            </Button>
                            <Button
                                variant="ghost"
                                fontWeight="normal"
                                as="a"
                                href="/create-account"
                                rel="noopener"
                            >
                                {translation.CreateAccountLink}
                            </Button> */}
                        </HStack>
                    </HStack>
                </Flex>
            </chakra.header>
        </>
    );
};
