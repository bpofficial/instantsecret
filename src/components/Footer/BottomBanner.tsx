import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import { FiEdit, FiSend } from "react-icons/fi";
import { ImFire } from "react-icons/im";
import { PAGE_MAX } from "../../constants";

export const BottomBanner = () => {
    return (
        <Flex
            w="100%"
            bg="custom.400"
            p={["6", "16"]}
            pb={["8", "24"]}
            align="center"
            justify="center"
        >
            <Flex
                color="white"
                justify={"space-around"}
                maxW={PAGE_MAX}
                w="100%"
                align="center"
                flexDirection={["column", "column", "column", "row"]}
            >
                <BannerItem
                    icon={<FiEdit />}
                    title="Create"
                    content="Paste in your private content and create your secure link"
                />
                <BannerItem
                    icon={<FiSend />}
                    title="Share"
                    content="Share your link with anyone via email or private message"
                />
                <BannerItem
                    icon={<ImFire />}
                    title="Burn"
                    content="Once your secure link is used it's then destroyed forever"
                />
            </Flex>
        </Flex>
    );
};

type BannerItemProps = { icon: any; title: string; content: string };
const BannerItem = ({ icon, title, content }: BannerItemProps) => (
    <VStack maxW="60" mx={["0", "0", "12"]} my={"6"} align="center">
        <Box fontSize={"5xl"}>{icon}</Box>
        <Box>
            <Heading fontSize={"3xl"}>{title}</Heading>
        </Box>
        <Box opacity={0.8} fontSize="sm" textAlign="center">
            {content}
        </Box>
    </VStack>
);
