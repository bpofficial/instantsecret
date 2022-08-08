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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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

        return {
            props: {
                linkId: id,
                secret: link,
            },
        };
    } catch (err: any) {
        console.log(err);
        return { props: { error: err.message } };
    }
};

const LinkMetadata = (props: NewLinkIdPageProps) => {
    const neverExisted = !props.secret || !props.linkId;
    const burnt = !!props?.secret?.burntAt;
    const viewed = !!props?.secret?.viewedByRecipientAt;

    return (
        <Head>
            <meta name="robots" content="noindex, nofollow" />
            <meta
                name="title"
                content="Instant Secure Link - Create One-Time Secure Links Instantly"
            />
            <meta
                name="description"
                content="Keep sensitive information out of your email and chat logs with a free, secure and encrypted link that can only be viewed once and then it's gone forever."
            />
        </Head>
    );
};
