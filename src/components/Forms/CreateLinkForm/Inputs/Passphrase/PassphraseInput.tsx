import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
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

    const onClear = () => {
        setValue("");
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
                    data-lpignore="true"
                />
                <InputRightElement width={"8rem"} pr="2" justifyContent={"end"}>
                    {value ? (
                        <IconButton
                            size="xs"
                            {...{ onClick: onClear }}
                            aria-label="Clear password"
                            icon={<FiTrash2 />}
                        />
                    ) : (
                        <></>
                    )}
                    <Button size="xs" {...{ onClick }} ml="1">
                        {translation.passphraseGenerator}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
    );
};
