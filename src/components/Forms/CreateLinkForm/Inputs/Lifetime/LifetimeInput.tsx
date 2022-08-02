import { FormControl, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "../../../../../hooks";
import { LifetimeLabel } from "./LifetimeLabel";

const ONE_HOUR = 3.6e6; //ms
const OFFSET = 1;

export const LifetimeInput = () => {
    const translation = useTranslation("CreateLinkForm");

    const options = [
        {
            label: "15 minutes",
            value: ONE_HOUR / 4 + OFFSET,
        },
        {
            label: "1 hour",
            value: ONE_HOUR + OFFSET,
        },
        {
            label: "12 hours",
            value: ONE_HOUR * 12 + OFFSET,
        },
        {
            label: "1 day",
            value: ONE_HOUR * 24 + OFFSET,
        },
        {
            label: "3 days",
            value: ONE_HOUR * 24 * 3 + OFFSET,
        },
        {
            label: "1 week",
            value: ONE_HOUR * 24 * 7 + OFFSET,
        },
    ];

    //

    const [value, setValue] = useState(options[3].value);

    return (
        <FormControl>
            <LifetimeLabel shown="(max-width: 768px)" />
            <Select
                name="ttl"
                value={value}
                onChange={(evt) => setValue(Number(evt.target.value))}
                borderColor="custom.400"
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
