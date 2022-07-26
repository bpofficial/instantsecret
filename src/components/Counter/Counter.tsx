import { useRef } from "react";
import { useCountUp } from "react-countup";

const easingFn = function (t: number, b: number, c: number, d: number) {
    return c * (Math.pow(t / d - 1, 5) + 1) + b;
};

interface CounterProps {
    data: {
        startNum?: number;
        endNum: number;
        duration?: number;
        delay?: number;
    };
}

export const Counter = (props: CounterProps) => {
    const {
        data: { startNum = 0, endNum, duration = 5, delay = 1 },
    } = props;
    const countUpRef = useRef(null);

    const { start, pauseResume, reset, update } = useCountUp({
        ref: countUpRef,
        start: startNum,
        end: endNum,
        separator: ",",
        smartEasingThreshold: 2000,
        smartEasingAmount: 30,
        useEasing: true,
        delay,
        duration,
    });

    return <span ref={countUpRef}>0</span>;
};
