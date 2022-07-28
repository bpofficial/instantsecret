import { FormLabel, Text, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "../../../../../hooks";

export const PassphraseLabel = ({ shown = "(min-width: 767px)" }) => {
    const translation = useTranslation("CreateLinkForm");

    const [show] = useMediaQuery(shown);
    if (!show) return null;

    return (
        <FormLabel>
            <Text fontWeight="semibold" textColor="custom.400" fontSize="sm">
                {translation.passphraseLabel}
            </Text>
        </FormLabel>
    );
};
