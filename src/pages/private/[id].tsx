import { gsspWithNonce } from "@next-safe/middleware/dist/document";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import {
    NeverExisted,
    PageWrapper,
    RevealSecretValueForm,
    ViewSecretValueForm,
} from "../../components";
import { getLinkFromApi } from "../../utils/getLinkFromApi";
import { parseBody } from "../../utils/parseBody";

interface PrivateSecretPageProps {
    secret?: {
        secretKey?: string;
        value?: string;
        encrypted?: boolean;
    };
    error?: {
        code: number;
        error?: string;
        description?: string;
        meta?: Record<string, any>;
    };
}

export default function PrivateSecretPage(props: PrivateSecretPageProps) {
    let component;
    if (!props.secret || !props.secret.secretKey) {
        component = <NeverExisted />;
    } else if (!props.secret.value) {
        component = (
            <RevealSecretValueForm
                secretKey={props.secret.secretKey}
                encrypted={!!props.secret.encrypted}
                error={props.error}
            />
        );
    } else if (props.secret.value) {
        component = <ViewSecretValueForm secretValue={props.secret.value} />;
    }

    return (
        <PageWrapper center fullHeight>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            {component}
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

        const body = await parseBody(ctx.req, "1mb");

        const link = await getLinkFromApi(id.toString(), {
            recipient: ctx.req.method === "POST",
            host: ctx.req.headers["host"] || "",
            passphrase: body.passphrase || null,
        });

        if (ctx.req.method === "POST") {
            if (link.code === 401) {
                return {
                    props: {
                        secret: {
                            secretKey: id,
                            encrypted: true,
                        },
                        error: link,
                    },
                };
            }
        }

        if (!link || link.viewedByRecipientAt || link.burntAt)
            return { props: {} };

        const now = new Date().getTime();
        const created = new Date(link.createdAt).getTime();
        const ttl = Number(link.ttl);
        if (created + ttl <= now) {
            return { props: {} };
        }

        return {
            props: {
                secret: link,
            },
        };
    }
);
