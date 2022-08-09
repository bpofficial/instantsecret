import { Heading, chakra } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const Title = ({ children }: PropsWithChildren) => {

    return (
        <Heading
            fontSize={["28px", "32px", "36px", "36px", "48px"]}
            fontWeight="extrabold"
            lineHeight={"1.2"}
            marginBlock="-2"
        >
            {children}
        </Heading>
    );
}

export const TitleHighlight = ({ children }: PropsWithChildren) => {
    return (<><chakra.span color="custom.300">
        {children}
    </chakra.span>&nbsp;</>)
}
