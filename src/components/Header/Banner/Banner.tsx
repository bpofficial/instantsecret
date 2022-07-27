import { Box, Flex } from "@chakra-ui/react";
import { useCounterValue } from "../../../hooks";
import { Counter } from "../../Counter";

export const Banner = () => {
    const value = useCounterValue();
    return (
        <Box w="100%" h="8" bgGradient="linear(to-r, #1D3557, #457B9D)">
            <Flex w="100%" h="8" justifyContent="center">
                <Box color="white" alignSelf="center" fontWeight="bold">
                    <Counter data={{ startNum: 0, endNum: value, delay: 0 }} />
                    &nbsp;secrets shared since launch
                </Box>
            </Flex>
        </Box>
    );
};
