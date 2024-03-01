import { useRef } from "react";
import { useCountUp } from "react-countup";

interface CounterProps {
    data: {
        startNum?: number;
        endNum: number;
        duration?: number;
        delay?: number;
    };
}

// start date
const S_D = new Date("2021-01-01");
// daily increment
const I_C = Math.ceil(Math.random() * 100);

const daysDiff = (date1: Date, date2: Date) => {
    return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
}

export const Counter = (props: CounterProps) => {
    const countUpRef = useRef(null);
    const total = daysDiff(S_D, new Date()) * I_C;
    const { duration = 2, delay = 0 } = props.data;

    useCountUp({
        ref: countUpRef,
        start: 0,
        end: total,
        separator: ",",
        smartEasingThreshold: 2000,
        smartEasingAmount: 30,
        useEasing: true,
        delay,
        duration,
    });

    return <span ref={countUpRef}>{props.data.startNum}</span>;
};
