import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack, VStack, Input } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTranslation } from "../../../hooks";
import { millisecondsToStr } from "../../../utils/humanReadableTimeDiff";
import {FormButton} from "../../FormButton";

interface LinkReceivedFormProps {
    secretKey: string;
    receivedAt: string;
    encrypted: boolean;
}

export const LinkReceivedForm = ({
    secretKey,
    receivedAt,
    encrypted,
}: LinkReceivedFormProps) => {
    const router = useRouter()
    const translation = useTranslation("LinkReceivedForm");

    const diff =
        typeof window !== "undefined"
            ? millisecondsToStr(
                  new Date().getTime() - new Date(receivedAt).getTime()
              )
            : null;

    const diffMessage =
        typeof window !== "undefined"
            ? `${translation.Received} ${diff} ago.`
            : null;

    // Need this because diff can be out of sync between server and client (3seconds ago vs 5seconds ago)
    const TimeDiff = dynamic(
        () =>
            Promise.resolve(() => {
                return <Box fontStyle="italic">{diffMessage}</Box>;
            }),
        { ssr: false }
    );

    return (
        <VStack align="left" spacing={4} w="100%" maxW={"620px"}>
            <Heading size="md">
                {translation.SecureLinkId} ({secretKey.slice(0, 8)})
            </Heading>
            <Input
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
                value={
                    encrypted
                        ? translation.EncryptedPlaceholder
                        : "******************"
                }
            />
            <TimeDiff />
            <FormButton
                text={translation.CreateNewLinkButton}
                rightElement={<ArrowForwardIcon mt="2" />}
                onSubmit={() => router.push('/links')}
            />
        </VStack>
    );
};
