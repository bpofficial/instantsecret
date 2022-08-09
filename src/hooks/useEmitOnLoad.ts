import { useEffect } from "react";
import { emit } from "../utils";

export const useEmitOnLoad = (...params: Parameters<typeof emit>) => {
    useEffect(() => emit(...params), []);
};
