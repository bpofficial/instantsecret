import {useMemo, useRef} from "react";
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

const daysDiff = (date1: Date, date2: Date) => {
    return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
}

export const Counter = (props: CounterProps) => {
    const countUpRef = useRef(null);
    const days = daysDiff(S_D, new Date());
    const { duration = 2, delay = 0 } = props.data;

    const total = useMemo(() => {
        let inc = 0;
        for (let i = 0; i < days; i++) {
            inc += Math.ceil(Math.random() * 10);
        }
        return inc
    }, [])

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
