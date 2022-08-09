import { getSession, Session, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { gsspWithNonce } from "@next-safe/middleware/dist/document";
import { getDynamodb } from "../../aws";
import { PageWrapper } from "../../components";
import { getLayout } from "../../components/Layouts/BaseLayout";

interface Link {}

interface AccountRootPageProps {
    user: Session["user"];
    links: Link[];
    error?: string;
}

export default function AccountRootPage(props: AccountRootPageProps) {
    return <PageWrapper>hi</PageWrapper>;
}
AccountRootPage.getLayout = getLayout;

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: gsspWithNonce(async (ctx) => {
        const session = getSession(ctx.req, ctx.res);

        if (!session) {
            return {
                redirect: {
                    destination: "/api/auth/login",
                    permanent: false,
                },
            };
        }
        const { dynamodb, tableName } = getDynamodb();

        const records = await dynamodb
            .scan({
                TableName: tableName,
                FilterExpression: "creatorUserID = :userId",
                ExpressionAttributeValues: { ":userId": session.user.sub },
            })
            .promise();

        console.log({ records });

        return {
            props: {
                user: session.user,
                links: [],
            },
        };
    }),
});
