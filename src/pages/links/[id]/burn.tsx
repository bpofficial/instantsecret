import { gsspWithNonce } from "@next-safe/middleware/dist/document";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { PageWrapper } from "../../../components";
import { BurnLinkForm } from "../../../components/Forms/BurnLinkForm";
import { getLayout } from "../../../components/Layouts/BaseLayout";
import { withCounterProps } from "../../../utils";
import { getLinkFromApi } from "../../../utils/getLinkFromApi";

export default function BurnLinkPage({ id = "" }) {
    return (
        <PageWrapper center fullHeight>
            <BurnMetadata />
            <BurnLinkForm linkId={id} />
        </PageWrapper>
    );
}
BurnLinkPage.getLayout = getLayout;

export const getServerSideProps = gsspWithNonce(
    withCounterProps(async (ctx: GetServerSidePropsContext) => {
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
            host: ctx.req.headers["host"] || "",
        });

        if (link?.burntAt) {
            return {
                redirect: { destination: `/links/${id}`, permanent: false },
            };
        }

        try {
            return {
                props: {
                    id,
                },
            };
        } catch (err: any) {
            return { props: { error: err.message } };
        }
    })
);

const BurnMetadata = () => {
    return (
        <Head>
            <meta name="robots" content="noindex, nofollow" />
            <title>Burn a Link - Instant Secure Link</title>
            <meta name="title" content="Burn a Link - Instant Secure Link" />
        </Head>
    );
};
