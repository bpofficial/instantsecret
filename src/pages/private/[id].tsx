import { Amplify } from 'aws-amplify';
import { GetServerSidePropsContext } from 'next';
import {
    NeverExisted,
    PageWrapper,
    ViewSecretValueForm,
} from '../../components';
import { RevealSecretValueForm } from '../../components/RevealSecretValueForm';

interface PrivateSecretPageProps {
    secret?: {
        id?: string;
        value?: string;
    };
}

export default function PrivateSecretPage(props: PrivateSecretPageProps) {
    return (
        <PageWrapper>
            {!props.secret || !props.secret.id ? (
                <NeverExisted />
            ) : !props.secret.value ? (
                <RevealSecretValueForm secretKey={props.secret.id} />
            ) : (
                <ViewSecretValueForm secretValue={props.secret.value} />
            )}
        </PageWrapper>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const { id } = ctx.params ?? {};
    const method = ctx.req.method;
    let secret;

    try {
        secret = await Amplify.API.get(
            'LinksEndpoint',
            `/links/${id}?recipient=${method === 'POST'}`
        );
    } catch (err) {
        return {
            props: {},
        };
    }

    if (secret.viewedByRecipientAt || secret.burntAt) return { props: {} };

    if (method === 'POST') {
        return {
            props: {
                secret: {
                    id: secret.secretKey,
                    value: secret.value,
                },
            },
        };
    } else {
        return {
            props: {
                secret: {
                    id: secret.secretKey,
                },
            },
        };
    }
}
