import { GetServerSidePropsContext } from "next";
import { CreateLinkForm, PageWrapper } from "../../components";
import { getProtocol } from "../../utils/getProtocol";
import { parseBody } from "../../utils/parseBody";

export default function LinkIndexPage() {
    return (
        <PageWrapper>
            <CreateLinkForm />
        </PageWrapper>
    );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    if (ctx.req.method === "POST") {
        const {
            value,
            passphrase = null,
            ttl = null,
            recipients = [],
            internal = null,
        } = await parseBody(ctx.req as any, "1mb");

        try {
            const result = await fetch(
                `${getProtocol()}://${ctx.req.headers["host"]}/api/links`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        value,
                        passphrase,
                        ttl,
                        internal,
                        recipients,
                    }),
                }
            );

            const body = await result.json();
            return {
                redirect: {
                    permanent: false,
                    destination: `/links/${body.linkId}`,
                },
            };
        } catch (err: any) {
            return {
                props: {
                    error: err.message ?? null,
                },
            };
        }
    }

    return { props: {} };
};
