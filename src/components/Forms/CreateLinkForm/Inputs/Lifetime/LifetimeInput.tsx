import { FormControl, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "../../../../../hooks";
import { LifetimeLabel } from "./LifetimeLabel";

const ONE_HOUR = 3.6e6; //ms
const OFFSET = 1000 * 60;

export const LifetimeInput = () => {
    const translation = useTranslation("CreateLinkForm");

    const options = [
        {
            label: "1 hour",
            value: ONE_HOUR + OFFSET,
        },
        {
            label: "1 day",
            value: ONE_HOUR * 24 + OFFSET,
        },
        {
            label: "1 week",
            value: ONE_HOUR * 24 * 7 + OFFSET,
        },
    ];

    //

    const [value, setValue] = useState(options[1].value);

    return (
        <FormControl>
            <LifetimeLabel shown="(max-width: 768px)" />
            <Select
                name="ttl"
                placeholder="Select a lifetime"
                value={value}
                onChange={(evt) => setValue(Number(evt.target.value))}
            >
                {options.map(({ label, value }, key) => (
                    <option key={key} {...{ value }}>
                        {label}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};
