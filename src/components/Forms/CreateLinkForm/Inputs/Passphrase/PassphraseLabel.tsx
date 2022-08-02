import {
    FormLabel,
    HStack,
    Text,
    Tooltip,
    useMediaQuery,
} from "@chakra-ui/react";
import { AiFillInfoCircle } from "react-icons/ai";
import { useTranslation } from "../../../../../hooks";

export const PassphraseLabel = ({ shown = "(min-width: 767px)" }) => {
    const translation = useTranslation("CreateLinkForm");

    const [show] = useMediaQuery(shown);
    if (!show) return null;

    return (
        <FormLabel>
            <Tooltip label="Use a password to add an additional layer of encryption. 10 failed attempts results in the link being burnt.">
                <HStack spacing="1">
                    <Text
                        fontWeight="semibold"
                        textColor="custom.400"
                        fontSize="sm"
                    >
                        {translation.passphraseLabel}
                    </Text>
                    <AiFillInfoCircle />
                </HStack>
            </Tooltip>
        </FormLabel>
    );
};
