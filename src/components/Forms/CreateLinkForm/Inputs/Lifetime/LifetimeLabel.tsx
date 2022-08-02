import {
    FormLabel,
    HStack,
    Text,
    Tooltip,
    useMediaQuery,
} from "@chakra-ui/react";
import { AiFillInfoCircle } from "react-icons/ai";
import { useTranslation } from "../../../../../hooks";

export const LifetimeLabel = ({ shown = "(min-width: 767px)" }) => {
    const translation = useTranslation("CreateLinkForm");

    const [show] = useMediaQuery(shown, { fallback: [false], ssr: true });
    if (!show) return null;

    return (
        <FormLabel>
            <Tooltip label="The lifetime of a secure link is the amount of time the link is accessible before it is automatically burnt.">
                <HStack spacing="1">
                    <Text
                        fontWeight="semibold"
                        textColor="custom.400"
                        fontSize="sm"
                    >
                        {translation.lifetimeLabel}
                    </Text>
                    <AiFillInfoCircle />
                </HStack>
            </Tooltip>
        </FormLabel>
    );
};
