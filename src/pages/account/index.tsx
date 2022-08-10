import { getSession, Session, withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
    Badge,
    Box,
    Button,
    Flex,
    HStack,
    Text,
    useBoolean,
    VStack,
} from "@chakra-ui/react";
import { gsspWithNonce } from "@next-safe/middleware/dist/document";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { ImFire } from "react-icons/im";
import { getDynamodb } from "../../aws";
import { PageWrapper, Subtitle, Title } from "../../components";
import { getLayout } from "../../components/Layouts/BaseLayout";
import { TTL_OFFSET } from "../../constants";

interface Link {
    expiredAt: string;
    createdAt: string;
    burntAt: string;
    viewedByRecipientAt: string;
    linkShortId: string;
    linkId: string;
}

interface AccountRootPageProps {
    user: Session["user"];
    links: Link[];
    error?: string;
}

const options = {
    year: "numeric",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
} as any;

export default function AccountRootPage(props: AccountRootPageProps) {
    const [links, setLinks] = useState(props.links);
    const { locale = "en-AU" } = useRouter();

    const [isBurning, burning] = useBoolean(false);
    const [burningId, setBurningId] = useState<string | null>(null);

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat(locale, {
            ...options,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }).format(new Date(date));
    };

    const hasExpired = (link: Link) => {
        const ea = new Date(link.expiredAt).getTime();
        return new Date().getTime() - ea >= 0;
    };
    const hasBeenViewed = (link: Link) => !!link.viewedByRecipientAt;
    const hasBeenBurnt = (link: Link) => !!link.burntAt;

    const getFlag = (link: Link) => {
        if (hasExpired(link)) return <Badge colorScheme="red">expired</Badge>;
        if (hasBeenViewed(link))
            return <Badge colorScheme="green">opened</Badge>;
        if (hasBeenBurnt(link)) return <Badge colorScheme="red">burnt</Badge>;
        return null;
    };

    const handleBurn = (link: Link) => async () => {
        setBurningId(link.linkId);
        burning.on();
        axios
            .post(
                "/api/account/links/burn",
                { id: link.linkId },
                { withCredentials: true }
            )
            .then((data) => {
                if (data.data.burntAt) {
                    setLinks((prev) => {
                        const idx = prev.findIndex(
                            (l) => l.linkId === link.linkId
                        );
                        const arr = [...prev];
                        if (arr[idx].burntAt) return prev;
                        arr[idx].burntAt = data.data.burntAt;
                        return arr;
                    });
                }
            })
            .catch(console.log)
            .finally(() => {
                burning.off();
                setBurningId(null);
            });
    };

    return (
        <PageWrapper fullHeight>
            <Flex direction="column" h="100%" align={"flex-start"} w="100%">
                <Title>Your Account</Title>
                <VStack align="flex-start" mt="12" w="100%">
                    <Subtitle>Previously created secure links</Subtitle>
                    <VStack
                        align="flex-start"
                        mt="4"
                        borderWidth="1px"
                        borderColor="custom.50"
                        w={["100%", "100%", "100%", "100%", "50%"]}
                        p="4"
                        borderRadius="md"
                        spacing="4"
                    >
                        {links
                            .filter((link) => link.linkShortId)
                            .sort(
                                (a, b) =>
                                    new Date(b.createdAt).getTime() -
                                    new Date(a.createdAt).getTime()
                            )
                            .map((link, idx, { length }) => (
                                <>
                                    <VStack
                                        w="100%"
                                        align="flex-start"
                                        key={idx}
                                    >
                                        <HStack>
                                            <Box
                                                fontWeight="semibold"
                                                letterSpacing="1px"
                                            >
                                                {link.linkShortId}
                                            </Box>
                                            {getFlag(link)}
                                        </HStack>
                                        <Flex
                                            justifyContent="space-between"
                                            w="100%"
                                            align="center"
                                        >
                                            <HStack w="100%" spacing="6">
                                                <VStack
                                                    spacing="0"
                                                    align="flex-start"
                                                >
                                                    <Box
                                                        fontSize={"sm"}
                                                        fontWeight="semibold"
                                                        color="custom.50"
                                                    >
                                                        Created At
                                                    </Box>
                                                    <Box>
                                                        {formatDate(
                                                            link.createdAt
                                                        )}
                                                    </Box>
                                                </VStack>
                                                <VStack
                                                    spacing="0"
                                                    align="flex-start"
                                                >
                                                    <Box
                                                        fontSize={"sm"}
                                                        fontWeight="semibold"
                                                        color="custom.50"
                                                    >
                                                        Expire
                                                        {hasExpired(link)
                                                            ? "d"
                                                            : "s"}{" "}
                                                        At
                                                    </Box>
                                                    <Box>
                                                        {formatDate(
                                                            link.expiredAt
                                                        )}
                                                    </Box>
                                                </VStack>
                                                {link.viewedByRecipientAt ? (
                                                    <VStack
                                                        spacing="0"
                                                        align="flex-start"
                                                    >
                                                        <Box
                                                            fontSize={"sm"}
                                                            fontWeight="semibold"
                                                            color="custom.50"
                                                        >
                                                            Opened At
                                                        </Box>
                                                        <Box>
                                                            {formatDate(
                                                                link.viewedByRecipientAt
                                                            )}
                                                        </Box>
                                                    </VStack>
                                                ) : null}
                                            </HStack>
                                            {!hasExpired(link) &&
                                            !hasBeenBurnt(link) &&
                                            !hasBeenViewed(link) ? (
                                                <Button
                                                    colorScheme="red"
                                                    onClick={handleBurn(link)}
                                                    isLoading={
                                                        isBurning &&
                                                        burningId ===
                                                            link.linkId
                                                    }
                                                >
                                                    <HStack align="center">
                                                        <Text>Burn</Text>
                                                        <Box pb="0.5">
                                                            <ImFire />
                                                        </Box>
                                                    </HStack>
                                                </Button>
                                            ) : null}
                                        </Flex>
                                    </VStack>
                                    {idx < length - 1 ? (
                                        <Box
                                            w="100%"
                                            h="1px"
                                            bg="lightgrey"
                                            key={idx + "-line"}
                                        />
                                    ) : null}
                                </>
                            ))}
                    </VStack>
                </VStack>
            </Flex>
        </PageWrapper>
    );
}
AccountRootPage.getLayout = getLayout;

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: gsspWithNonce(async (ctx) => {
        const session = getSession(ctx.req, ctx.res);

        if (!session) {
            return {
                redirect: {
                    destination: "/api/auth/login",
                    permanent: false,
                },
            };
        }
        const { dynamodb, tableName } = getDynamodb();

        const records = await dynamodb
            .scan({
                TableName: tableName,
                FilterExpression: "creatorUserID = :userId",
                ExpressionAttributeValues: { ":userId": session.user.sub },
            })
            .promise();

        const filterProperties = (record: any) => ({
            expiredAt: new Date(
                new Date(record.createdAt).getTime() + record.ttl - TTL_OFFSET
            ).toISOString(),
            createdAt: record.createdAt,
            burntAt: record.burntAt || null,
            viewedByRecipientAt: record.viewedByRecipientAt || null,
            linkShortId: record.idSub || null,
            linkId: record.id,
        });

        return {
            props: {
                user: session.user,
                // deepcode ignore PureMethodReturnValueIgnored: ?
                links: records.Items?.map(filterProperties),
            },
        };
    }),
});
