import { Flex } from "@chakra-ui/react";

export const PageWrapper = ({ children }: any) => {
  return (
    <Flex
      data-type={"page-wrapper"}
      w="100%"
      px={[4, 12, 16]}
      alignItems="center"
      maxW={"1200px"}
      margin={"auto"}
      mt={[4, 6, 10, 12]}
      justifyContent={"center"}
    >
      {children}
    </Flex>
  );
};
