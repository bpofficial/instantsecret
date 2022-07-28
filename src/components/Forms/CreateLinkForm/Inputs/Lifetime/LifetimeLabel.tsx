import { FormLabel, Text, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "../../../../../hooks";

export const LifetimeLabel = ({ shown = "(min-width: 767px)" }) => {
    const translation = useTranslation("CreateLinkForm");

    const [show] = useMediaQuery(shown, { fallback: [false], ssr: true });
    if (!show) return null;

    return (
        <FormLabel>
            <Text fontWeight="semibold" textColor="custom.400" fontSize="sm">
                {translation.lifetimeLabel}
            </Text>
        </FormLabel>
    );
};
