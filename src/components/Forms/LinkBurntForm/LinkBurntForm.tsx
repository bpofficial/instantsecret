import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, Heading, Textarea, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useEmitOnLoad, useTranslation } from "../../../hooks";
import { FormButton } from "../../FormButton";

interface LinkBurntFormProps {
    linkId: string;
    burntAt: string;
}

export const LinkBurntForm = ({ linkId }: LinkBurntFormProps) => {
    const translation = useTranslation("LinkBurntForm");
    const router = useRouter();

    useEmitOnLoad("burnt_link_viewed");

    return (
        <Formik {...{ onSubmit: () => {} }} initialValues={{} as any}>
            <Flex w="100%" justifyContent="center" alignItems="center">
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
            </Flex>
        </Formik>
    );
};
