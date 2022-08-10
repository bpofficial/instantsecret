import { Box, Spacer } from "@chakra-ui/react";
import { PropsWithChildren, ReactNode } from "react";
import { BottomBanner } from "../Footer";
import { getLayout as getBaseLayout } from "./BaseLayout";

export const LayoutWithBottomBanner = ({ children }: PropsWithChildren) => (
    <>
        {children}
        <Box>
            {/* 0px for 3 BPs because these are the BPs where the form has Y-padding above & below the content in flex column */}
            {/* the others are 60px + the current top margin of that container (80, 90, 100px), see index.tsx & PageWrapper.tsx */}
            <Spacer h={["0px", "0px", "0px", "140px", "150px", "160px"]} />
        </Box>
        <BottomBanner />
    </>
);

export const getLayout = (page: ReactNode, props?: Record<string, any>) =>
    getBaseLayout(
        <LayoutWithBottomBanner>{page}</LayoutWithBottomBanner>,
        props
    );
