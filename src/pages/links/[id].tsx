import { withSSRContext } from 'aws-amplify';
import { SecretsManager } from 'aws-sdk';
import { useRouter } from 'next/router';
import { LinkModel } from '../../models';

interface LinkWithIdPageProps {
    secret?: {
        id?: string;
        value?: string;
    };
}

export default function LinkWithIdPage(props: LinkWithIdPageProps) {
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (!props.secret) {
        return <div>404</div>;
    }

    if (!props.secret.value) {
        return <div>continue?</div>;
    }

    return <div>Secret: {props.secret.value}</div>;
}

export async function getServerSideProps(req: any) {
    const { API, DataStore } = withSSRContext(req);
    const { params } = req;
    const { id } = params;

    let secret;
    try {
        const record: LinkModel = await DataStore.query(LinkModel, id);
        console.log(record);
        if (record.burnt || record.views) return { props: {} };

        secret = await API.get('LinksEndpoint', `/links/${id}`);
    } catch (err) {
        return {
            props: {},
        };
    }

    const method = req.method;
    if (method === 'POST' && req.body['continue'] === true) {
        return {
            props: {
                secret: {
                    value: secret,
                },
            },
        };
    } else {
        return {
            props: {
                secret: {},
            },
        };
    }
}
