import { getSession, Session, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getDynamodb } from "../../aws";
import { PageWrapper } from "../../components";

interface Link {}

interface AccountRootPageProps {
    user: Session["user"];
    links: Link[];
    error?: string;
}

export default function AccountRootPage(props: AccountRootPageProps) {
    return <PageWrapper>hi</PageWrapper>;
}

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx) {
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
    },
});
