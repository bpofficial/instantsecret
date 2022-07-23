import { GetServerSidePropsContext } from "next";
import {
    NeverExisted,
    PageWrapper,
    ViewSecretValueForm,
} from "../../components";
import { RevealSecretValueForm } from "../../components/Forms/RevealSecretValueForm";
import { getLinkFromApi } from "../../utils/getLinkFromApi";

interface PrivateSecretPageProps {
    secret?: {
        secretKey?: string;
        value?: string;
    };
}

export default function PrivateSecretPage(props: PrivateSecretPageProps) {
    return (
        <PageWrapper>
            {!props.secret || !props.secret.secretKey ? (
                <NeverExisted />
            ) : !props.secret.value ? (
                <RevealSecretValueForm secretKey={props.secret.secretKey} />
            ) : (
                <ViewSecretValueForm secretValue={props.secret.value} />
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

    const link = await getLinkFromApi(id.toString(), {
        recipient: ctx.req.method === "POST",
        host: ctx.req.headers["host"] || "",
    });

    if (!link || link.viewedByRecipientAt || link.burntAt) return { props: {} };

    try {
        if (ctx.req.method === "POST") {
            return {
                props: {
                    secret: {
                        secretKey: link.secretKey,
                        value: link.value,
                    },
                },
            };
        } else {
            return {
                props: {
                    secret: {
                        secretKey: id,
                    },
                },
            };
        }
    } catch (err: any) {
        return { props: { error: err.message } };
    }
};
