import { gsspWithNonce } from "@next-safe/middleware/dist/document";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import {
    LinkBurntForm,
    LinkReceivedForm,
    NeverExisted,
    PageWrapper,
} from "../../../components";
import { ShareLinkForm } from "../../../components/Forms/ShareLinkForm";
import { getLinkFromApi } from "../../../utils/getLinkFromApi";

interface NewLinkIdPageProps {
    linkId?: string;
    secret?: {
        burntAt: string;
        secretKey: string;
        value: string;
        ttl: number;
        createdAt: string;
        encrypted: boolean;
        viewedByRecipientAt: string;
    };
    error?: string;
}

export default function NewLinkIdPage(props: NewLinkIdPageProps) {
    return (
        <PageWrapper center fullHeight>
            <LinkMetadata {...props} />
            {!props.secret || !props.linkId ? (
                <NeverExisted />
            ) : props.secret.burntAt ? (
                <LinkBurntForm
                    linkId={props.linkId}
                    burntAt={props.secret.burntAt}
                />
            ) : props.secret.viewedByRecipientAt ? (
                <LinkReceivedForm
                    secretId={props.secret.secretKey}
                    encrypted={props.secret.encrypted}
                    receivedAt={props.secret.viewedByRecipientAt}
                />
            ) : (
                <ShareLinkForm
                    linkId={props.linkId}
                    encrypted={props.secret.encrypted}
                    secretKey={props.secret.secretKey}
                    secretValue={props.secret.value}
                    ttl={props.secret.ttl}
                    createdAt={props.secret.createdAt}
                />
            )}
        </PageWrapper>
    );
}

export const getServerSideProps = gsspWithNonce(
    async (ctx: GetServerSidePropsContext) => {
        const { id } = ctx.params ?? {};

        if (!id || !id.toString().trim().length) {
            return {
                redirect: {
                    destination: "/404",
                    permanent: false,
                },
            };
        }

        try {
            const link = await getLinkFromApi(id.toString(), {
                creator: true,
                host: ctx.req.headers["host"] || "",
            });

            if (!link) return { props: {} };

            // Only return what's needed!
            return {
                props: {
                    linkId: id,
                    secret: link.burntAt
                        ? { burntAt: link.burntAt }
                        : link.viewedByRecipientAt
                        ? {
                              secretKey: link.secretKey?.slice(0, 8),
                              encrypted: link.encrypted,
                              viewedByRecipientAt: link.viewedByRecipientAt,
                          }
                        : {
                              secretKey: link.secretKey,
                              encrypted: link.encrypted,
                              value: link.value,
                              ttl: link.ttl,
                              createdAt: link.createdAt,
                          },
                },
            };
        } catch (err: any) {
            console.log(err);
            return { props: { error: err.message } };
        }
    }
);

const LinkMetadata = (props: NewLinkIdPageProps) => {
    const neverExisted = !props.secret || !props.linkId;
    const burnt = !!props?.secret?.burntAt;
    const viewed = !!props?.secret?.viewedByRecipientAt;

    return (
        <Head>
            <meta name="robots" content="noindex, nofollow" />
            <title>Share a Link - Instant Secure Link</title>
            <meta name="title" content="Share link - Instant Secure Link" />
        </Head>
    );
};
