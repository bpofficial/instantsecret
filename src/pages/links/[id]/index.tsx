import { Flex, useMediaQuery } from '@chakra-ui/react';
import { Amplify } from 'aws-amplify';
import { GetServerSidePropsContext } from 'next';
import {
    LinkBurntForm,
    LinkReceivedForm,
    NeverExisted,
    PageWrapper,
} from '../../../components';
import { ShareLinkForm } from '../../../components/ShareLinkForm';

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
        <PageWrapper>
            {!props.secret || !props.linkId ? (
                <NeverExisted />
            ) : props.secret.burntAt ? (
                <LinkBurntForm
                    linkId={props.linkId}
                    burntAt={props.secret.burntAt}
                />
            ) : props.secret.viewedByRecipientAt ? (
                <LinkReceivedForm
                    secretKey={props.secret.secretKey}
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

export async function getServerSideProps(opts: GetServerSidePropsContext) {
    const { id } = opts.params ?? {};
    if (!id) return { props: {} };

    let secret;
    try {
        secret = await Amplify.API.get(
            'LinksEndpoint',
            `/links/${id}?creator=true`
        );
    } catch (err: any) {
        return {
            props: {
                error: err.message,
            },
        };
    }

    return {
        props: { secret, linkId: id },
    };
}
