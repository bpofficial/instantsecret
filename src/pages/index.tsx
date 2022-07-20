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
import { useTranslation } from '../hooks';

const CopyContent = () => {
  const translation = useTranslation('index');
  const [isLargerThan767] = useMediaQuery(['(min-width: 767px)']);

  return (
    <Box maxW={isLargerThan767 ? '680px' : undefined}>
      <VStack spacing={isLargerThan767 ? '8' : '6'} align="flext-start">
        <Heading fontSize={isLargerThan767 ? '5xl' : '3xl'}>
          <chakra.span color="custom.300">
            {translation.copy.coloredTitle}&nbsp;
          </chakra.span>
          {translation.copy.remainingTitle}
        </Heading>

        <Box
          fontSize={isLargerThan767 ? 'xl' : 'lg'}
          color="custom.400"
          fontWeight="600"
        >
          {translation.copy.subtitle}
        </Box>

        <HStack spacing="8">
          <Button
            size="lg"
            bg="custom.400"
            color="white"
            fontWeight="bold"
            px="8"
            py="6"
            _hover={{ opacity: 0.7 }}
            _active={{ opacity: 0.7 }}
          >
            {translation.copy.ctaButton}
          </Button>
          <Button variant="link">{translation.copy.securityButton}</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default function Index() {
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
      justifyContent="space-between"
    >
      <CopyContent />
      {isLargerThan1199 ? null : (
        <Box>
          <Spacer h="12" />
        </Box>
      )}
      <BasicSetupForm />
    </Flex>
  );
}
