import { createContext, PropsWithChildren, useContext, useState } from "react";

interface UnloadContext {
    message: string;
    value: boolean;
    setValue: (val: boolean, msg?: string) => void;
}

const defaultMessage = "Are you sure you want to leave?";
const UnloadContext = createContext<UnloadContext>({
    message: defaultMessage,
    value: false,
    setValue: (val: boolean, message?: string) => {
        // void
    },
});

export const useUnload = () => {
    return useContext(UnloadContext);
};

export const UnloadProvider = ({ children }: PropsWithChildren) => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState(defaultMessage);

    const setValue = (val: boolean, msg?: string) => {
        console.log(val, msg);
        setShow(val);
        setMessage(msg || defaultMessage);
    };

    return (
        <UnloadContext.Provider value={{ value: show, setValue, message }}>
            {children}
        </UnloadContext.Provider>
    );
};

export const UnloadScript = () => {
    const { value, message } = useUnload();
    if (value) {
        return (
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                            console.log("loaded");
                            function confirmExit(ev) {
                                ev.preventDefault();
                                console.log(ev)
                                return "${message}";
                            }
                            window.onbeforeunload = confirmExit;
                        })();
                    `,
                }}
            />
        );
    }
    return <></>;
};
