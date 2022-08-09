import { Box, Flex } from "@chakra-ui/react";
import { useCounterValue } from "../../../hooks";
import { Counter } from "../../Counter";

export const Banner = () => {
    const [startNum, endNum] = useCounterValue();

    return (
        <Box w="100%" h="8" bgGradient="linear(to-r, #1D3557, #457B9D)">
            <Flex w="100%" h="8" justifyContent="center">
                <Box color="white" alignSelf="center" fontWeight="bold">
                    <Counter
                        data={{ startNum, endNum, delay: 0.5 }}
                    />
                    &nbsp;secure links created since launch
                </Box>
            </Flex>
        </Box>
    );
};
