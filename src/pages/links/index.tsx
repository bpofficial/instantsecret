import { GetServerSidePropsContext } from 'next';
import { API } from 'aws-amplify';
import { Flex, useMediaQuery } from '@chakra-ui/react';
import { CreateLinkForm } from '../../components';
import { parseBody } from '../../utils/parseBody';

export default function LinkIndexPage() {
    const [isLargerThan767, isLargerThan1199] = useMediaQuery(
        ['(min-width: 767px)', '(min-width: 1199px)'],
        { fallback: [false, true], ssr: true }
    );

    return (
        <Flex
            mt={isLargerThan1199 ? '20' : undefined}
            w="100%"
            px={isLargerThan767 ? '24' : '6'}
            py={isLargerThan767 ? '12' : '4'}
            direction={isLargerThan1199 ? 'row' : 'column-reverse'}
            justifyContent="center"
        >
            <CreateLinkForm />
        </Flex>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    if (ctx.req.method === 'POST') {
        const {
            value,
            passphrase = null,
            ttl = null,
            recipients = [],
            internal = null,
        } = await parseBody(ctx.req as any, '1mb');

        try {
            const result = await API.post('LinksEndpoint', '/links', {
                body: {
                    value,
                    passphrase,
                    ttl,
                    internal,
                    recipients,
                },
            });
            return {
                redirect: {
                    permanent: false,
                    destination: `/links/${result.linkId}`,
                },
            };
        } catch (err: any) {
            return {
                props: {
                    error: err.message,
                },
            };
        }
    }

    return { props: {} };
};
