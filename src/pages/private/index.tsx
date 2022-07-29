import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PageWrapper } from "../../components";

export default function PrivateIndexPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/links");
    }, [router]);

    return (
        <PageWrapper center fullHeight>
            <Flex w="100%" justifyContent="center" alignItems="center"></Flex>
        </PageWrapper>
    );
}
