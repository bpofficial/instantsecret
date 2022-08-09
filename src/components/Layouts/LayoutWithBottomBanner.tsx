import { Box, Spacer } from "@chakra-ui/react";
import { PropsWithChildren, ReactNode } from "react";
import { BottomBanner } from "../Footer";
import { getLayout as getBaseLayout } from "./BaseLayout";

export const LayoutWithBottomBanner = ({ children }: PropsWithChildren) => (
    <>
        {children}
        <Box>
            <Spacer h={["60px", "60px", "120px"]} />
        </Box>
        <BottomBanner />
    </>
);

export const getLayout = (page: ReactNode, props?: Record<string, any>) =>
    getBaseLayout(
        <LayoutWithBottomBanner>{page}</LayoutWithBottomBanner>,
        props
    );
