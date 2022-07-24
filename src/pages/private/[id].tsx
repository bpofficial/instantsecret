import { GetServerSidePropsContext } from "next";
import {
    NeverExisted,
    PageWrapper,
    ViewSecretValueForm,
} from "../../components";
import { RevealSecretValueForm, EnterPassphraseForm } from "../../components";
import { getLinkFromApi } from "../../utils/getLinkFromApi";

interface PrivateSecretPageProps {
    secret?: {
        secretKey?: string;
        value?: string;
        encrypted?: boolean
    };
}

export default function PrivateSecretPage(props: PrivateSecretPageProps) {
    let component;
    if (!props.secret || !props.secret.secretKey) {
        component = <NeverExisted />
    } else if (!props.secret.value) {
        if (props.secret.encrypted) {
            component = <EnterPassphraseForm secretKey={props.secret.secretKey} />
        } else {
            component = <RevealSecretValueForm secretKey={props.secret.secretKey} />
        }
    } else if (props.secret.value) {
        component = <ViewSecretValueForm secretValue={props.secret.value} />
    }

    return (
        <PageWrapper>
            {component}
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

    return {
        props: {
            secret: {
                secretKey: id,
            },
        },
    };
};
