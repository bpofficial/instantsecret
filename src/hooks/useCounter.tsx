import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const CounterContext = createContext([0, 0]);

export const useCounterValue = () => {
    return useContext(CounterContext);
};

interface CounterProviderProps {
    children: React.ReactNode;
}

const checkDate = (date?: string | null) => {
    try {
        if (!date) return false;
        const d = new Date(date);
        if (Number.isNaN(Number(date))) return false;
        if (Number.isNaN(d.getTime())) return false;
        const diff = new Date().getTime() - d.getTime();
        if (diff > (1000 * 60 * 60 * 24 * 3)) {
            return false; // 3 days
        }
        return true;
    } catch {
        return false;
    }
}

const immediateValue = (key: string, fallback?: any) => {
    return typeof window !== 'undefined' ? window.localStorage.getItem(key) : fallback ?? null;
}

export const CounterProvider = ({ children }: CounterProviderProps) => {
    const [lastLoad, setLastLoad] = useLocalStorage('last-load', immediateValue("last-load"))
    const [counter, setCounter] = useLocalStorage("counter", immediateValue("counter", 0));
    const [loadFromZero] = useState(!checkDate(lastLoad));

    const fetchCounter = async () => {
        return axios
            .get(`/api/stats`)
            .then((data) => data.data.value)
            .catch(console.warn);
    };

    useEffect(() => {
        // setLastLoad(new Date().getTime());
        fetchCounter().then((val) => setCounter(val));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log({ counter, loadFromZero })

    return (
        <CounterContext.Provider value={[loadFromZero ? 0 : counter, counter]}>
            {children}
        </CounterContext.Provider>
    );
};
