import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const Subtitle = ({ children }: PropsWithChildren) => {
    return (
        <Box color="custom.400" fontWeight="600">
            {children}
        </Box>
    )
}
