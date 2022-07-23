import { BurnLinkForm } from "../../../components/Forms/BurnLinkForm";
import { NeverExisted, PageWrapper } from "../../../components";
import { getLinkFromApi } from "../../../utils/getLinkFromApi";
import { GetServerSidePropsContext } from "next";

export default function BurnLinkPage({ id = "" }) {
    return (
        <PageWrapper>
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
        creator: true,
        host: ctx.req.headers["host"] || "",
    });

    if (link.burntAt) {
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
