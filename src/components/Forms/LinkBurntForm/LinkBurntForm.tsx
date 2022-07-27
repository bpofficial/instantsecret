import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Heading, Textarea, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "../../../hooks";
import { FormButton } from "../../FormButton";

interface LinkBurntFormProps {
    linkId: string;
    burntAt: string;
}

export const LinkBurntForm = ({ linkId, burntAt }: LinkBurntFormProps) => {
    const translation = useTranslation("LinkBurntForm");
    const router = useRouter();

    return (
        <VStack align="left" spacing={4} w="100%" maxW={"620px"}>
            <Heading size="md">
                {translation.Title} ({linkId?.slice(0, 8) ?? "??"})
            </Heading>
            <Textarea
                w="100%"
                maxW={"620px"}
                borderColor="custom.400"
                borderWidth="2px"
                borderRadius="md"
                alignSelf="center"
                _hover={{
                    opacity: 1,
                }}
                readOnly
                value={translation.LinkBurntPlaceholder}
            />
            <FormButton
                text={translation.CreateNewLinkButton}
                rightElement={<ArrowForwardIcon mt="2" />}
                onSubmit={() => router.push("/links")}
            />
        </VStack>
    );
};
