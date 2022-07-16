import { Box, Flex } from '@chakra-ui/react';

export const Banner = () => {
  return (
    <Box w="100%" h="8" bgGradient="linear(to-r, #1D3557, #457B9D)">
      <Flex w="100%" h="8" justifyContent="center">
        <Box color="white" alignSelf="center" fontWeight="bold">
          11,408,831 secrets shared since launch
        </Box>
      </Flex>
    </Box>
  );
};
