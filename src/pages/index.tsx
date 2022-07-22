import {
  Box,
  Button,
  chakra,
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

export const IndexCopyContent = () => {
  const translation = useTranslation("index");
  const [isLargerThan767] = useMediaQuery(["(min-width: 767px)"], {
    fallback: [true],
    ssr: true,
  });

  return (
    <Box maxW={isLargerThan767 ? "720px" : undefined}>
      <VStack spacing={isLargerThan767 ? "8" : "6"} align="flext-start">
        <Heading fontSize={isLargerThan767 ? "5xl" : "3xl"}>
          <chakra.span color="custom.300">
            {translation.copy.coloredTitle}
          </chakra.span>
          &nbsp;
          {translation.copy.remainingTitle}
        </Heading>

        <Box
          fontSize={isLargerThan767 ? "xl" : "lg"}
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
  const [isLargerThan1199] = useMediaQuery(["(min-width: 1199px)"], {
    fallback: [true],
    ssr: true,
  });
  const router = useRouter();

  useEffect(() => {
    if (redirect) {
      router.push(redirect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect]);

  return (
    <PageWrapper>
      <IndexCopyContent />
      <Box display={{ base: "none", md: "block", sm: "block" }}>
        <Spacer h="12" />
      </Box>
      <CreateLinkForm />
    </PageWrapper>
  );
}
