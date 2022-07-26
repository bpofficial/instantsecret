import axios from "axios";
import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

const CounterContext = createContext({
    counter: 0,
});

export const useCounterValue = () => {
    return useContext(CounterContext).counter;
};

interface CounterProviderProps {
    children: React.ReactNode;
}

export const CounterProvider = ({ children }: CounterProviderProps) => {
    const [counter, setCounter] = useLocalStorage("counter", 0);

    const fetchCounter = async () => {
        return axios
            .get(`/api/stats`)
            .then((data) => data.data.value)
            .catch(console.warn);
    };

    useEffect(() => {
        fetchCounter().then((val) => setCounter(val));
    }, []);

    return (
        <CounterContext.Provider value={{ counter }}>
            {children}
        </CounterContext.Provider>
    );
};
