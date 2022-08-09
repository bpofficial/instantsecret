import { chakra, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import { PageWrapper } from "../components";

export default function PrivacyPolicyPage() {
    return (
        <PageWrapper>
            <PrivacyPolicyMetadata />
            <Flex mt="100px" maxW="1200px" justifyContent="center">
                <Text>
                    <Heading
                        fontSize={["32px", "32px", "36px", "36px", "48px"]}
                        fontWeight="extrabold"
                        color="custom.400"
                    >
                        Privacy Policy
                    </Heading>
                    <br />
                    We are committed to protecting your privacy. This policy
                    describes our practices regarding personal and account
                    information collected through our website.
                    <br />
                    <br />
                    We will periodically review the appropriateness of this
                    privacy policy and may make, in our discretion, such changes
                    as are necessary. If we decide to change this privacy
                    policy, we will post those changes here so that you will
                    always know what information we gather, how we might use
                    that information, and whether we will disclose it to anyone.
                    You should visit our website periodically to review any
                    changes.
                    <br />
                    <br />
                    <Heading fontSize="2xl" color="custom.400" fontWeight="800">
                        Do we use the secret data for any other purpose?
                    </Heading>
                    <br />
                    No. We currently do not analyse or look at the secrets in
                    any manual or automated way.
                    <br />
                    <br />
                    <Heading fontSize="2xl" color="custom.400" fontWeight="800">
                        How safe is this tool?
                    </Heading>
                    <br />
                    We feel that this tool is definitely safer than using email
                    or chat tools to send private information. However, if you
                    are concerned that any third party (ie. us) holding this
                    data is a risk, then you should consider either encrypting
                    the data first and passing the credentials for this one-time
                    via another means, or use something else altogether (GnuPG
                    is a good candidate).
                    <br />
                    <br />
                    <Heading fontSize="2xl" color="custom.400" fontWeight="800">
                        How safe is this tool?
                    </Heading>
                    <br />
                    We feel that this tool is definitely safer than using email
                    or chat tools to send private information. However, if you
                    are concerned that any third party (ie. us) holding this
                    data is a risk, then you should consider either encrypting
                    the data first and passing the credentials for this one-time
                    via another means, or use something else altogether (GnuPG
                    is a good candidate).
                    <br />
                    <br />
                    <Heading fontSize="2xl" color="custom.400" fontWeight="800">
                        What personal and account information do we collect?
                    </Heading>
                    <br />
                    The amount and type of personal and account information we
                    collect from you depends on your activities and use of our
                    website. Below, we explain what information we collect under
                    specific contexts.
                    <br />
                    <br />
                    <Heading fontSize="xl" opacity={0.8}>
                        When you browse our website
                    </Heading>
                    <chakra.ul ml="8" mt="2">
                        <li>
                            <b>IP address</b> - We collect your IP address to
                            measure our web site traffic and to help prevent
                            malicious use.
                        </li>
                        <li>
                            <b>Referral web site</b> - If you come to our web
                            site via a link, we collect the location of the link
                            that referred you.
                        </li>
                        <li>
                            <b>Browser and platform</b> - We collect information
                            about the browser you are using to help optimise our
                            web site for visitors.
                        </li>
                    </chakra.ul>
                    <br />
                    <Heading fontSize="2xl" color="custom.400" fontWeight="800">
                        What measures do we use to protect your personal
                        information?
                    </Heading>
                    <chakra.ul ml="8" mt="2">
                        <li>
                            We use secure, encrypted mechanisms (SSL) when
                            accepting and transmitting information.
                        </li>
                        <li>
                            We regularly perform security audits and updates on
                            our servers.
                        </li>
                    </chakra.ul>
                    <br />
                    <br />
                    <br />
                    <br />
                </Text>
            </Flex>
        </PageWrapper>
    );
}

const PrivacyPolicyMetadata = () => {
    return (
        <Head>
            <title>
                Privacy Policy - Instant Secure Link
            </title>
            <meta
                name="title"
                content="Privacy Policy - Instant Secure Link"
            />
            <meta
                name="description"
                content=""
            />
        </Head>
    );
};
