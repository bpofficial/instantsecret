import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Counter } from "../../Counter";

type BannerProps = { initialValue: number };

export const Banner = ({ initialValue }: BannerProps) => {
    const [startNum, setStartNum] = useState(initialValue);
    const [endNum, setEndNum] = useState(initialValue);

    const fetchCounter = async () => {
        return axios
            .get(`/api/stats`)
            .then((data) => data.data.value)
            .catch(console.warn);
    };

    useEffect(() => {
        fetchCounter().then((val) => {
            if (val !== endNum) {
                setStartNum(endNum);
            }
            setEndNum(val);
        });
    }, []);

    console.log({ startNum });

    return (
        <Box w="100%" h="8" bgGradient="linear(to-r, #1D3557, #457B9D)">
            <Flex w="100%" h="8" justifyContent="center">
                <Box color="white" alignSelf="center" fontWeight="bold">
                    <Counter
                        data={{
                            startNum,
                            endNum,
                            delay: 0.5,
                        }}
                    />
                    &nbsp;secure links created since launch
                </Box>
            </Flex>
        </Box>
    );
};
