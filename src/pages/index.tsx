import {
    Box,
    Button,
    chakra, Flex,
    Heading,
    HStack,
    Spacer,
    useMediaQuery,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CreateLinkForm, PageWrapper } from "../components";
import { useTranslation } from "../hooks";
import {GetServerSidePropsContext} from "next";

export const IndexCopyContent = () => {
  const translation = useTranslation("index");

  return (
    <Box maxW={{ base: '100%', lg: '60%' }} mt={["8", "4"]}>
      <VStack align="flext-start" spacing={6}>
        <Heading fontSize={{ base: '3xl', md: '5xl' }}>
          <chakra.span color="custom.300">
            {translation.copy.coloredTitle}
          </chakra.span>
          &nbsp;
          {translation.copy.remainingTitle}
        </Heading>

        <Box
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

interface IndexProps {
  redirect?: string;
  error?: string;
}

export default function Index({ redirect }: IndexProps) {
  return (
    <PageWrapper>
        <Flex direction={["column-reverse", "column-reverse", "row"]} justify={"left"} mb={8}>
          <IndexCopyContent />
          {/*<CreateLinkForm />*/}
        </Flex>
    </PageWrapper>
  );
}

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    if (ctx.req.method === 'POST') {
        return {
            redirect: {
                permanent: false,
                destination: '/hellopost'
            }
        }
    }
}
