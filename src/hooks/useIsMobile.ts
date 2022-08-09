import { useBreakpointValue } from "@chakra-ui/react";

export const useIsMobile = () => useBreakpointValue([true, true, false, false, false, false]);
