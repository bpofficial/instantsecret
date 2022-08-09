import { PropsWithChildren, ReactNode } from "react";
import { Footer } from "../Footer";
import { TopBar } from "../Header";
import { Banner } from "../Header/Banner/Banner";

type Props = PropsWithChildren & Record<string, any>;
export const BaseLayout = ({ children, ...props }: Props) => {
    return (
        <>
            <Banner initialValue={props?.__COUNTER ?? 0} />
            <TopBar />
            {children}
            <Footer />
        </>
    );
};

export const getLayout = (page: ReactNode, props?: Record<string, any>) => (
    <BaseLayout {...props}>{page}</BaseLayout>
);
