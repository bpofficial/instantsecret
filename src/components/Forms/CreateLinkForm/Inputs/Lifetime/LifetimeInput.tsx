import { FormControl } from "@chakra-ui/react";
import { useTranslation } from "../../../../../hooks";
import { InputSelect } from "../../../../InputSelect";
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
        {
            label: "1 month",
            value: ONE_HOUR * 24 * 7 * 30 + OFFSET,
        },
    ];

    return (
        <FormControl>
            <LifetimeLabel shown="(max-width: 768px)" />
            <InputSelect
                name="ttl"
                placeholder="Select a lifetime"
                defaultValue={options[2]}
                options={options}
            >
                <></>
            </InputSelect>
        </FormControl>
    );
};
