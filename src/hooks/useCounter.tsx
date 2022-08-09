import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

const CounterContext = createContext([0, 0]);

export const useCounterValue = () => {
    return useContext(CounterContext);
};

interface CounterProviderProps {
    children: React.ReactNode;
    initialValue?: number;
}

export const immediateValue = (key: string, fallback?: any) => {
    return typeof window !== "undefined"
        ? window.localStorage.getItem(key)
        : fallback ?? null;
};

export const CounterProvider = ({
    children,
    initialValue = 0,
}: CounterProviderProps) => {
    const [counter, setCounter] = useLocalStorage(
        "counter",
        immediateValue("counter", initialValue)
    );

    const fetchCounter = async () => {
        return axios
            .get(`/api/stats`)
            .then((data) => data.data.value)
            .catch(console.warn);
    };

    useEffect(() => {
        fetchCounter().then((val) => setCounter(val));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CounterContext.Provider value={[initialValue, counter]}>
            {children}
        </CounterContext.Provider>
    );
};
