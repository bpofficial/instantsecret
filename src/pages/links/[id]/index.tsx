import { GetServerSidePropsContext } from "next";
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
        return { props: { error: err.message } };
    }
};
