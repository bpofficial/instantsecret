import { Amplify } from 'aws-amplify';
import { GetServerSidePropsContext } from 'next';

interface NewLinkIdPageProps {
    secret?: {
        key: string;
        value: string;
    };
    error?: string;
}

export default function NewLinkIdPage(props: NewLinkIdPageProps) {
    console.log({ props });

    if (!props.secret) {
        return <div>404</div>;
    }

    return (
        <div>
            {props.secret.key}:{props.secret.value}
        </div>
    );
}

export async function getServerSideProps(opts: GetServerSidePropsContext) {
    const { id } = opts.params ?? {};

    if (!id) return { props: {} };

    let secret;
    try {
        secret = await Amplify.API.get('LinksEndpoint', `/links/${id}`, {});
        console.log({ secret });
    } catch (err: any) {
        return {
            props: {
                error: err.message,
            },
        };
    }

    return {
        props: { secret },
    };
}
