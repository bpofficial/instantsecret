import { GetServerSidePropsContext } from "next";
import { NeverExisted, PageWrapper } from "../../../components";
import { BurnLinkForm } from "../../../components/Forms/BurnLinkForm";
import { getLinkFromApi } from "../../../utils/getLinkFromApi";

export default function BurnLinkPage({ id = "" }) {
    return (
        <PageWrapper center fullHeight>
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
