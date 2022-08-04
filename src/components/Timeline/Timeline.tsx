import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { createRef, RefObject, useEffect, useState } from "react";
import { TimelineItem } from "./TimelineItem";

type TimelineItem = ({ empty: true } | { title: string; content: string }) & {
    title?: string;
    content?: string;
    emtpy?: boolean;
};

export type TimelineItems = { left: TimelineItem[]; right: TimelineItem[] };

export interface TimelineProps {
    items: TimelineItems;
    startingSide: "left" | "right";
}

export const Timeline = ({ items, startingSide = "right" }: TimelineProps) => {
    const [refs, setRefs] = useState<RefObject<HTMLDivElement>[]>([]);
    const [result, setResult] = useState<TimelineItem[]>([]);
    const allRight = useBreakpointValue([true, true, false]);

    useEffect(() => {
        if (!items || (!items.left && !items.right)) return;
        const refArr = [];
        const arr = [];
        let nextSide = startingSide;

        const left = [...items.left].reverse();
        const right = [...items.right].reverse();

        while (left.length > 0 || right.length > 0) {
            refArr.push(createRef<HTMLDivElement>());
            if (nextSide === "left") {
                arr.push(left.pop());
                nextSide = "right";
            } else {
                arr.push(right.pop());
                nextSide = "left";
            }
        }

        setResult(arr as any);
        setRefs(refArr);
    }, [items]);

    return (
        <Flex justify="space-between" w="100%" position="relative">
            <Flex direction="column" w="100%">
                {result.map((item, idx) => (
                    <TimelineItem
                        index={idx}
                        left={
                            allRight
                                ? false
                                : startingSide === "left"
                                ? idx % 2 === 0
                                : idx % 1 === 0
                        }
                        right={
                            allRight
                                ? true
                                : startingSide === "right"
                                ? idx % 2 === 0
                                : idx % 1 === 0
                        }
                        fullWidth={!!allRight}
                        ref={refs[idx]}
                        key={idx}
                        empty={item?.emtpy}
                        {...item}
                    />
                ))}
            </Flex>
            <Box
                position="absolute"
                height="100%"
                w="6px"
                bg="custom.400"
                borderRadius="md"
                top="0"
                left={["0", "0", "calc(50% - 3px)"]}
            />
        </Flex>
    );
};
