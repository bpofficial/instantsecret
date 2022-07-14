import {
  Box,
  Button,
  HStack,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { chakra, Flex } from '@chakra-ui/react';
import Image from 'next/image';

export const TopBar = () => {
  const bg = useColorModeValue('white', 'gray.800');
  return (
    <>
      <chakra.header bg={bg} w="full" px={16} py={4}>
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Instant Secret"
              display="flex"
              alignItems="center"
            >
              <Box>
                <Image
                  src="/assets/logo.svg"
                  width="25px"
                  height="25px"
                  alt="Instant Search Icon"
                />
              </Box>
              <VisuallyHidden>Instant Secret</VisuallyHidden>
              <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                InstantSecret
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
                href="/about"
                rel="noopener"
              >
                Security
              </Button>
              <Button
                variant="ghost"
                fontWeight="normal"
                as="a"
                href="/about"
                rel="noopener"
              >
                About
              </Button>
              <Button
                variant="ghost"
                fontWeight="normal"
                as="a"
                href="/signin"
                rel="noopener"
              >
                Sign in
              </Button>
              <Button
                variant="ghost"
                fontWeight="normal"
                as="a"
                href="/create-account"
                rel="noopener"
              >
                Create Account
              </Button>
            </HStack>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
};
