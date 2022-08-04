import { Box, BoxProps, Heading, Text, VStack } from "@chakra-ui/react";
import {
    ForwardedRef,
    forwardRef,
    RefObject,
    useEffect,
    useState,
} from "react";

const DOT_WIDTH = 20;
const DOT_HEIGHT = 20;

type TimelineItemDotProps = { boxHeight: number } & BoxProps;
const TimelineItemDot = ({ boxHeight = 0, ...props }: TimelineItemDotProps) => {
    return (
        <Box
            position={"absolute"}
            h={`${DOT_HEIGHT}px`}
            w={`${DOT_WIDTH}px`}
            borderRadius="full"
            bg="custom.400"
            zIndex="2"
            top={`${boxHeight / 2 - DOT_HEIGHT / 2}px`}
            {...props}
        />
    );
};

type TimelineItemProps = {
    title?: string;
    content?: string;
    empty?: boolean;
    left?: boolean;
    right?: boolean;
    index: number;
    fullWidth: boolean;
};

export const TimelineItem = forwardRef(
    (props: TimelineItemProps, ref: ForwardedRef<HTMLDivElement>) => {
        const [boxHeight, setBoxHeight] = useState(0);

        const tenPercent =
            0.25 *
            ((ref as RefObject<HTMLDivElement>)?.current?.clientWidth ?? 0);
        const dotProps = {
            right:
                !props.fullWidth && props.left
                    ? `-${DOT_WIDTH / 2 + tenPercent}px`
                    : undefined,
            left: props.fullWidth
                ? `-67.5px`
                : props.right
                ? `-${DOT_WIDTH / 2 + tenPercent}px`
                : undefined,
        };

        useEffect(() => {
            if (ref) {
                setBoxHeight(
                    (ref as RefObject<HTMLDivElement>)?.current?.clientHeight ??
                        0
                );
            }
        }, [ref]);

        if (props.empty || !(props.title && props.content)) {
            return <Box h="16" ref={ref}></Box>;
        }

        return (
            <Box
                position="relative"
                maxW={props.fullWidth ? "90%" : "40%"}
                mt={props.fullWidth ? "8" : "0"}
                alignSelf={
                    props.right && !props.fullWidth ? "flex-end" : "flex-start"
                }
                ml={props.fullWidth ? "60px" : 0}
            >
                <Box position="relative">
                    <TimelineItemDot boxHeight={boxHeight} {...dotProps} />
                    <Box
                        p="6"
                        borderRadius="md"
                        borderWidth="1px"
                        boxShadow="md"
                        ref={ref}
                    >
                        <VStack align="left">
                            <Heading fontSize={"sm"}>{props.title}</Heading>
                            <Text>{props.content}</Text>
                        </VStack>
                    </Box>
                </Box>
            </Box>
        );
    }
);
TimelineItem.displayName = "TimelineItem";
