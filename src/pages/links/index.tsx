import Head from "next/head";
import { CreateLinkForm, PageWrapper } from "../../components";

export default function LinkIndexPage() {
    return (
        <PageWrapper center fullHeight>
            <LinkIndexMetadata />
            <CreateLinkForm />
        </PageWrapper>
    );
}

const LinkIndexMetadata = () => {
    return (
        <Head>
            <meta
                name="title"
                content="Instant Secure Link - Create One-Time Secure Links Instantly"
            />
            <meta
                name="description"
                content="Keep sensitive information out of your email and chat logs with a free, secure and encrypted link that can only be viewed once and then it's gone forever."
            />
        </Head>
    );
};
