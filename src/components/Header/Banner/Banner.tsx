import { Box, Flex } from "@chakra-ui/react";
import { useCounterValue } from "../../../hooks";
import { Counter } from "../../Counter";

const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
const START_OF_SITE = new Date("07/01/2022").getTime();
const CREATED_PER_DAY_AVG = 19;

const getStartNum = () => {
    const now = new Date().getTime();
    const diff = now - START_OF_SITE;
    const days = Math.floor(diff / MILLIS_PER_DAY);
    return days * CREATED_PER_DAY_AVG;
};

export const Banner = () => {
    const startNum = getStartNum();
    const value = useCounterValue();

    return (
        <Box w="100%" h="8" bgGradient="linear(to-r, #1D3557, #457B9D)">
            <Flex w="100%" h="8" justifyContent="center">
                <Box color="white" alignSelf="center" fontWeight="bold">
                    <Counter
                        data={{ startNum, endNum: startNum + value, delay: 0 }}
                    />
                    &nbsp;secure links created since launch
                </Box>
            </Flex>
        </Box>
    );
};
