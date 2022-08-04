import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { PageWrapper } from "../components";

export default function Security() {
    return (
        <PageWrapper fullHeight center>
            <Box p={["4", "24"]} mt={["12"]}>
                <VStack
                    maxW={["100%", "720px"]}
                    align="center"
                    spacing="6"
                    justify="center"
                >
                    <Box fontSize={"6xl"}>🚧</Box>
                    <Heading
                        fontSize={["2xl", "3xl"]}
                        color="custom.400"
                        fontWeight="800"
                        textAlign="center"
                    >
                        Page Under Construction
                    </Heading>
                    <Text align="center" opacity="0.9">
                        We&apos;re still writing this page for you to read, make
                        sure to check back in regularly so you don&apos;t miss
                        when this page is finished.
                    </Text>
                </VStack>
            </Box>
        </PageWrapper>
    );
}

// import {
//     Box,
//     Button,
//     chakra,
//     Flex,
//     Heading,
//     Text,
//     VStack,
// } from "@chakra-ui/react";
// import { useRouter } from "next/router";
// import { PageWrapper } from "../components";

// export default function Security() {
//     return (
//         <PageWrapper>
//             <Flex
//                 mb={["8", "12", "16"]}
//                 mt={["4", "8", "8", "36"]}
//                 direction="column"
//                 maxW="100%"
//             >
//                 <Flex
//                     direction={["column", "column", "column", "row"]}
//                     justify={["center", "center", "center", "space-between"]}
//                     maxW="100%"
//                 >
//                     <SecurityTitle />
//                     <Flex
//                         align="left"
//                         mb={["12"]}
//                         direction="column"
//                         maxW={["100%", "100%", "100%", "60%"]}
//                         minW={["100%", "100%", "100%", "60%"]}
//                     >
//                         <SecurityContent />
//                     </Flex>
//                 </Flex>
//             </Flex>
//         </PageWrapper>
//     );
// }

// const TIMELINE_ITEMS = {
//     left: [
//         {
//             title: "Create a secure link",
//             content:
//                 "Utilising the same 256bit encryption as global banking platforms, you can rest assured that nobody has access to your secure content.",
//         },
//         {
//             title: "Create a secure link",
//             content:
//                 "Utilising the same 256bit encryption as global banking platforms, you can rest assured that nobody has access to your secure content.",
//         },
//     ],
//     right: [
//         {
//             title: "Create a secure link",
//             content:
//                 "Utilising the same 256bit encryption as global banking platforms, you can rest assured that nobody has access to your secure content.",
//         },
//         {
//             title: "Create a secure link",
//             content:
//                 "Utilising the same 256bit encryption as global banking platforms, you can rest assured that nobody has access to your secure content.",
//         },
//         {
//             title: "Create a secure link",
//             content:
//                 "Utilising the same 256bit encryption as global banking platforms, you can rest assured that nobody has access to your secure content.",
//         },
//         {
//             title: "Create a secure link",
//             content:
//                 "Utilising the same 256bit encryption as global banking platforms, you can rest assured that nobody has access to your secure content.",
//         },
//     ],
// };

// type TimelineItemBaseProps = { title: string; content: string };
// type TimelineItemProps = (
//     | (TimelineItemBaseProps & { left: true })
//     | (TimelineItemBaseProps & { right: true })
//     | { empty: true }
// ) &
//     (Partial<TimelineItemBaseProps> & {
//         left?: boolean;
//         right?: boolean;
//         empty?: boolean;
//     });

// const TimelineItem = ({
//     title,
//     content,
//     left,
//     right,
//     empty,
// }: TimelineItemProps) => {
//     const WIDTH = 20;
//     const HEIGHT = 20;

//     const props = {
//         right: left ? `-${80 + WIDTH / 2}px` : undefined,
//         left: right ? `-${80 + WIDTH / 2}px` : undefined,
//     };

//     if (empty) {
//         return <Box h="52"></Box>;
//     }
//     return (
//         <Box position="relative">
//             <Box
//                 position={"absolute"}
//                 h={`${HEIGHT}px`}
//                 w={`${WIDTH}px`}
//                 borderRadius="full"
//                 bg="red"
//                 zIndex="2"
//                 top="45%"
//                 {...props}
//             />
//             <Box
//                 p="6"
//                 borderRadius="md"
//                 borderWidth="1px"
//                 boxShadow="md"
//                 maxW="400px"
//             >
//                 <VStack align="left">
//                     <Heading fontSize={"sm"}>{title}</Heading>
//                     <Text>{content}</Text>
//                 </VStack>
//             </Box>
//         </Box>
//     );
// };

// const SecurityContent = () => {
//     return (
//         <Flex justify="space-between">
//             <VStack spacing="24">
//                 <TimelineItem empty />
//                 {TIMELINE_ITEMS.left.map((item, key) => (
//                     <TimelineItem left {...item} key={key} />
//                 ))}
//             </VStack>
//             <Box minW="160px"></Box>
//             <VStack spacing="24">
//                 {TIMELINE_ITEMS.right.map((item, key) => (
//                     <TimelineItem right {...item} key={key} />
//                 ))}
//             </VStack>
//         </Flex>
//     );
// };

// const SecurityTitle = () => {
//     const router = useRouter();

//     return (
//         <Box
//             maxW={["100%", "100%", "100%", "50%"]}
//             minW={["100%", "100%", "100%", "50%"]}
//             mb={["12"]}
//         >
//             <VStack align="flext-start" spacing={[6, 8]}>
//                 <Heading
//                     fontSize={["32px", "36px", "48px"]}
//                     fontWeight="extrabold"
//                 >
//                     <chakra.span color="custom.300">
//                         Highest-grade encryption to
//                     </chakra.span>
//                     &nbsp;keep your sensitive info away from prying eyes
//                 </Heading>

//                 <Box color="custom.400" fontWeight="600">
//                     We&apos;re always working on new features and upgrades to
//                     continue to deliver the best experience possible.
//                 </Box>

//                 <Flex
//                     justify={["center", "center", "left"]}
//                     flexDirection={["column", "row"]}
//                 >
//                     <Button
//                         size="lg"
//                         bg="custom.400"
//                         color="white"
//                         fontWeight="bold"
//                         px="8"
//                         py="6"
//                         _hover={{ bg: "custom.50" }}
//                         onClick={() => router.push(`/links`)}
//                     >
//                         WATCH A DEMO
//                     </Button>
//                     <Button
//                         variant="link"
//                         color="custom.400"
//                         pt={["4", "0"]}
//                         pl={["4", "8"]}
//                         onClick={() => router.push(`/links`)}
//                     >
//                         Create a secure link
//                     </Button>
//                 </Flex>
//             </VStack>
//         </Box>
//     );
// };
