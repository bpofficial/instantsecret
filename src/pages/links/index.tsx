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
            <title>
                Create a New Secure Link - Instant Secure Link
            </title>
            <meta
                name="title"
                content="Create a New Secure Link - Instant Secure Link"
            />
            <meta
                name="description"
                content="Create a secure link to keep sensitive information out of your email and chat logs that can only be viewed once and then it's gone forever."
            />
        </Head>
    );
};
