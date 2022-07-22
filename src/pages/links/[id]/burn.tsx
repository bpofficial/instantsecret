import { GetServerSidePropsContext } from 'next';
import { Amplify } from 'aws-amplify';
import { BurnLinkForm } from '../../../components/BurnLinkForm';
import { PageWrapper } from '../../../components';

interface BurnLinkPageProps {
    id: string;
    error?: string;
}

export default function BurnLinkPage(props: BurnLinkPageProps) {
    return (
        <PageWrapper>
            <BurnLinkForm linkId={props.id} />
        </PageWrapper>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { id } = ctx.params ?? {};
    if (ctx.req.method === 'POST') {
        try {
            await Amplify.API.del('LinksEndpoint', `/links/${id}`, {});
            return {
                redirect: {
                    permanent: false,
                    destination: `/links/${id}`,
                },
            };
        } catch (err: any) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/links/${id}`,
                },
            };
        }
    }
    return { props: { id } };
};
