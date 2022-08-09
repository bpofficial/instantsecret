import { useEffect } from "react";
import { emit } from "../utils";

export const useEmitOnLoad = (...params: Parameters<typeof emit>) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => emit(...params), []);
};
