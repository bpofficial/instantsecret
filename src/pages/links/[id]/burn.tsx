import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { NeverExisted, PageWrapper } from "../../../components";
import { BurnLinkForm } from "../../../components/Forms/BurnLinkForm";
import { getLinkFromApi } from "../../../utils/getLinkFromApi";

export default function BurnLinkPage({ id = "" }) {
    return (
        <PageWrapper center fullHeight>
            <BurnMetadata neverExisted={!id} />
            {id ? <BurnLinkForm linkId={id} /> : <NeverExisted />}
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
};

const BurnMetadata = ({ neverExisted = false }) => {
    return (
        <Head>
            <meta name="robots" content="noindex, nofollow" />
            <meta
                name="title"
                content="Instant Secure Link - Create One-Time Secure Links Instantly"
            />
        </Head>
    );
};
