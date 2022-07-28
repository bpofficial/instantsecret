import {
    Button,
    FormControl,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "../../../../../hooks";
import { generatePassphrase } from "../../../../../utils/generatePassphrase";
import { PassphraseLabel } from "./PassphraseLabel";

export const PassphraseInput = () => {
    const translation = useTranslation("CreateLinkForm");
    const [value, setValue] = useState("");

    const onClick = () => {
        const pwd = generatePassphrase();
        setValue(pwd);
    };

    return (
        <FormControl>
            <PassphraseLabel shown="(max-width: 768px)" />
            <InputGroup>
                <Input
                    name="passphrase"
                    value={value}
                    onChange={(evt) => setValue(evt.target.value)}
                    placeholder={translation.passphrasePlaceholder}
                    autoComplete="off"
                    borderColor="custom.400"
                />
                <InputRightElement width="5rem" pr="0.4">
                    <Button size="xs" {...{ onClick }}>
                        {translation.passphraseGenerator}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
    );
};
