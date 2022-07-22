import { GetServerSidePropsContext } from "next";
import { BurnLinkForm } from "../../../components/BurnLinkForm";
import { NeverExisted, PageWrapper } from "../../../components";
import { getProtocol } from "../../../utils/getProtocol";

interface BurnLinkPageProps {
    id: string;
    error?: string;
}

export default function BurnLinkPage(props: BurnLinkPageProps) {
    return (
        <PageWrapper>
            {props.id ? <BurnLinkForm linkId={props.id} /> : <NeverExisted />}
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

    try {
        if (ctx.req.method === "POST") {
            await fetch(
                `${getProtocol()}://${ctx.req.headers["host"]}/api/links/${id}`,
                {
                    method: "DELETE",
                }
            );
            return {
                redirect: {
                    destination: `/links/${id}`,
                    permanent: false,
                },
            };
        } else {
            return {
                props: {
                    id,
                },
            };
        }
    } catch (err: any) {
        console.log(err);
        return { props: { error: err.message } };
    }
};
