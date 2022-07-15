import {
  Box,
  Button,
  Heading,
  HStack,
  Textarea,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useTranslation } from '../../hooks';
import { PassphraseInput, PassphraseLabel } from './Inputs/Passphrase';
import { LifetimeInput, LifetimeLabel } from './Inputs/Lifetime';
import { Formik } from 'formik';

export const BasicSetupForm = () => {
  const translation = useTranslation('BasicSetupForm');

  return (
    <Box
      w="100%"
      maxW={'620px'}
      borderColor="custom.400"
      borderWidth="2px"
      borderRadius="md"
      alignSelf="center"
    >
      <Textarea
        placeholder={translation.inputPlaceholder}
        borderBottomColor="custom.300"
        shadow="none"
        w="100%"
        h="40%"
        minH="200px"
        fontSize="lg"
        bg="color.100"
        p="4"
        borderRadius="4"
        _focus={{
          border: 'none',
          borderRadius: '4px',
          outline: 'none',
          boxShadow: 'none',
        }}
        style={{
          border: 'none',
          borderRadius: '4px',
          boxShadow: 'none',
        }}
      />
      <Box w="100%" h="2px" bg="custom.400" />
      <Box>
        <Heading size="sm" textAlign="center" p="6" color="custom.400">
          {translation.privacyOptionsTitle}
        </Heading>
        <Formik onSubmit={console.log} initialValues={{}}>
          <PrivacyOptionInputs />
        </Formik>
      </Box>
      <Button
        mt="2"
        w="100%"
        borderRadius="0"
        bg="custom.400"
        color="white"
        size="lg"
        fontWeight="bold"
        _active={{
          bg: 'custom.300',
        }}
        _hover={{
          bg: 'custom.300',
        }}
      >
        <HStack>
          <Box>{translation.createLinkButton}</Box>
          <ArrowForwardIcon mt="2" />
        </HStack>
      </Button>
    </Box>
  );
};

const PrivacyOptionInputs = () => {
  const [isLargerThan767] = useMediaQuery(['(min-width: 767px)']);

  const ContainerComponent = isLargerThan767 ? HStack : VStack;
  const SubComponent = isLargerThan767 ? VStack : HStack;
  const FirstComponent = isLargerThan767 ? (
    <>
      <Box p="1" mt="1">
        <PassphraseLabel />
      </Box>
      <Box p="1" textAlign="right">
        <LifetimeLabel />
      </Box>
    </>
  ) : (
    <PassphraseInput />
  );

  const SecondComponent = isLargerThan767 ? (
    <>
      <PassphraseInput />
      <LifetimeInput />
    </>
  ) : (
    <LifetimeInput />
  );

  return (
    <ContainerComponent
      spacing="1"
      justifyContent={isLargerThan767 ? 'center' : undefined}
      px="6"
      pb="6"
      w="100%"
    >
      <SubComponent
        w={isLargerThan767 ? undefined : '100%'}
        align={isLargerThan767 ? 'flex-end' : undefined}
      >
        {FirstComponent}
      </SubComponent>
      <SubComponent
        w={isLargerThan767 ? '60%' : '100%'}
        align={isLargerThan767 ? 'flex-end' : undefined}
      >
        {SecondComponent}
      </SubComponent>
    </ContainerComponent>
  );
};
