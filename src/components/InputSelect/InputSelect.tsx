/* eslint-disable react/display-name */

import {
    Box,
    Center,
    CloseButton,
    createIcon,
    Divider,
    Flex,
    omitThemingProps,
    Portal,
    StylesProvider,
    Tag,
    TagCloseButton,
    TagLabel,
    ThemingProps,
    useColorModeValue,
    useFormControlProps,
    useMultiStyleConfig,
    useStyles,
    useTheme,
} from "@chakra-ui/react";
import { getColor, mode } from "@chakra-ui/theme-tools";
import React, {
    cloneElement,
    forwardRef,
    JSXElementConstructor,
    LegacyRef,
    ReactElement,
} from "react";
import ReactSelect, { components as selectComponents } from "react-select";
import AsyncReactSelect from "react-select/async";

// Taken from the @chakra-ui/icons package to prevent needing it as a dependency
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/icons/src/ChevronDown.tsx
const ChevronDown = createIcon({
    displayName: "ChevronDownIcon",
    d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z",
});

// Custom styles for components which do not have a chakra equivalent
const chakraStyles = {
    input: (provided: any) => ({
        ...provided,
        color: "inherit",
        lineHeight: 1,
        autocomplete: "off",
    }),
    menu: (provided: any) => ({
        ...provided,
        boxShadow: "none",
    }),
    valueContainer: (provided: any, { selectProps: { size } }: any) => {
        const px: any = {
            sm: "0.75rem",
            md: "1rem",
            lg: "1rem",
        };

        return {
            ...provided,
            padding: `0.125rem ${px[size]}`,
            autocomplete: "off",
        };
    },
    loadingMessage: (provided: any, { selectProps: { size } }: any) => {
        const fontSizes: any = {
            sm: "0.875rem",
            md: "1rem",
            lg: "1.125rem",
        };

        const paddings: any = {
            sm: "6px 9px",
            md: "8px 12px",
            lg: "10px 15px",
        };

        return {
            ...provided,
            fontSize: fontSizes[size],
            padding: paddings[size],
        };
    },
    // Add the chakra style for when a TagCloseButton has focus
    multiValueRemove: (
        provided: any,
        { isFocused, selectProps: { multiValueRemoveFocusStyle } }: any
    ) => (isFocused ? multiValueRemoveFocusStyle : {}),
    control: () => ({}),
    menuList: () => ({}),
    option: () => ({}),
    multiValue: () => ({}),
    multiValueLabel: () => ({}),
    group: () => ({}),
};

const chakraComponents = {
    // Control components
    Control: (props: any) => {
        const {
            children,
            innerRef,
            innerProps,
            isDisabled,
            isFocused,
            selectProps: { size },
        } = props;

        const ownProps = omitThemingProps({
            ...props,
            autocomplete: "off",
        } as any);
        const input = useFormControlProps<HTMLInputElement>(ownProps);
        const inputStyles = useMultiStyleConfig("Input", props);
        const { isInvalid = false } = input;
        let { errorBorderColor: ec } = props;
        ec ??= mode("red.500", "red.300")(props);

        const theme = useTheme();

        const heights: any = {
            sm: 8,
            md: 10,
            lg: 12,
        };

        return (
            <StylesProvider value={inputStyles}>
                <Flex
                    ref={innerRef}
                    sx={{
                        ...inputStyles.field,
                        p: 0,
                        overflow: "hidden",
                        h: "auto",
                        minH: heights[size],
                        _invalid: {
                            borderColor: getColor(theme, ec),
                            boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
                        },
                    }}
                    {...innerProps}
                    {...(isFocused && { "data-focus": true })}
                    {...(isDisabled && { disabled: true })}
                    {...(isInvalid && {
                        "aria-invalid": true,
                        "data-invalid": true,
                    })}
                    autocomplete="off"
                >
                    {children}
                </Flex>
            </StylesProvider>
        );
    },
    MultiValueContainer: ({
        children,
        innerRef,
        innerProps,
        data,
        selectProps,
    }: any) => (
        <Tag
            ref={innerRef}
            {...innerProps}
            m="0.125rem"
            // react-select Fixed Options example: https://react-select.com/home#fixed-options
            variant={data.isFixed ? "solid" : "subtle"}
            colorScheme={data.colorScheme || selectProps.colorScheme}
            size={selectProps.size}
        >
            {children}
        </Tag>
    ),
    MultiValueLabel: ({ children, innerRef, innerProps }: any) => (
        <TagLabel ref={innerRef} {...innerProps}>
            {children}
        </TagLabel>
    ),
    MultiValueRemove: ({
        children,
        innerRef,
        innerProps,
        data: { isFixed },
    }: any) => {
        if (isFixed) {
            return null;
        }

        return (
            <TagCloseButton ref={innerRef} {...innerProps} tabIndex={-1}>
                {children}
            </TagCloseButton>
        );
    },
    IndicatorSeparator: ({ innerProps }: any) => (
        <Divider {...innerProps} orientation="vertical" opacity="1" />
    ),
    ClearIndicator: ({ innerProps, selectProps: { size } }: any) => (
        <CloseButton {...innerProps} size={size} mx={2} tabIndex={-1} />
    ),
    DropdownIndicator: ({ innerProps, selectProps: { size } }: any) => {
        const { addon } = useStyles();

        const iconSizes: any = {
            sm: 4,
            md: 5,
            lg: 6,
        };
        const iconSize = iconSizes[size];

        return (
            <Center
                {...innerProps}
                sx={{
                    ...addon,
                    h: "100%",
                    borderRadius: 0,
                    borderWidth: 0,
                    cursor: "pointer",
                }}
            >
                <ChevronDown h={iconSize} w={iconSize} />
            </Center>
        );
    },
    // Menu components
    MenuPortal: ({ children }: any) => <Portal>{children}</Portal>,
    Menu: ({ children, ...props }: any) => {
        const menuStyles = useMultiStyleConfig("Menu", props);
        return (
            <selectComponents.Menu {...props}>
                <StylesProvider value={menuStyles}>{children}</StylesProvider>
            </selectComponents.Menu>
        );
    },
    MenuList: ({
        innerRef,
        children,
        maxHeight,
        selectProps: { size },
    }: any) => {
        const { list } = useStyles();
        const chakraTheme = useTheme();

        const borderRadii: any = {
            sm: chakraTheme.radii.sm,
            md: chakraTheme.radii.md,
            lg: chakraTheme.radii.md,
        };

        return (
            <Box
                sx={{
                    ...list,
                    maxH: `${maxHeight}px`,
                    overflowY: "auto",
                    borderRadius: borderRadii[size],
                }}
                ref={innerRef}
            >
                {children}
            </Box>
        );
    },
    GroupHeading: ({ innerProps, children }: any) => {
        const { groupTitle } = useStyles();
        return (
            <Box sx={groupTitle} {...innerProps}>
                {children}
            </Box>
        );
    },
    Option: ({
        innerRef,
        innerProps,
        children,
        isFocused,
        isDisabled,
        selectProps: { size },
    }: any) => {
        const { item }: any = useStyles();
        return (
            <Box
                role="button"
                sx={{
                    ...item,
                    w: "100%",
                    textAlign: "left",
                    bg: isFocused ? item._focus.bg : "transparent",
                    fontSize: size,
                    ...(isDisabled && item._disabled),
                }}
                ref={innerRef}
                {...innerProps}
                {...(isDisabled && { disabled: true })}
            >
                {children}
            </Box>
        );
    },
};

interface InputSelectProps extends React.ComponentProps<typeof ReactSelect> {
    size?: "sm" | "md" | "lg";
    colorScheme?: ThemingProps["colorScheme"];
    theme?: any;
    styles?: any;
    children: ReactElement<any, string | JSXElementConstructor<any>>;
    components?: any;
    //onChange: (value: string) => void;
}

const InputSelectComponent = ({
    children,
    styles = {},
    components = {},
    theme = () => ({}),
    size = "md",
    colorScheme = "gray",
    ...props
}: InputSelectProps) => {
    const chakraTheme = useTheme();

    // The chakra theme styles for TagCloseButton when focused
    const closeButtonFocus =
        chakraTheme.components.Tag.baseStyle.closeButton._focus;
    const multiValueRemoveFocusStyle = {
        background: closeButtonFocus?.bg,
        boxShadow: chakraTheme.shadows?.[closeButtonFocus?.boxShadow],
    };

    // The chakra UI global placeholder color
    // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/styles.ts#L13
    const placeholderColor = useColorModeValue(
        chakraTheme.colors.gray[500],
        chakraTheme.colors.whiteAlpha[400]
    );

    // Ensure that the size used is one of the options, either `sm`, `md`, or `lg`
    let realSize = size;
    const sizeOptions = ["sm", "md", "lg"];
    if (!sizeOptions.includes(size)) {
        realSize = "md";
    }

    const select = cloneElement(children, {
        components: {
            ...chakraComponents,
            ...components,
        },
        styles: {
            ...chakraStyles,
            ...styles,
            autocomplete: "off",
        },
        theme: (baseTheme: any) => {
            const propTheme = theme(baseTheme);

            return {
                ...baseTheme,
                ...propTheme,
                colors: {
                    ...baseTheme.colors,
                    neutral50: placeholderColor, // placeholder text color
                    neutral40: placeholderColor, // noOptionsMessage color
                    ...propTheme.colors,
                },
                spacing: {
                    ...baseTheme.spacing,
                    ...propTheme.spacing,
                },
            };
        },
        autocomplete: "off",
        colorScheme,
        size: realSize,
        multiValueRemoveFocusStyle,
        ...props,
    });

    return select;
};

export const InputSelect = forwardRef(
    (props: InputSelectProps, ref: LegacyRef<ReactSelect>) => {
        return (
            <InputSelectComponent {...props}>
                <ReactSelect ref={ref as any} />
            </InputSelectComponent>
        );
    }
);

export const AsyncInputSelect = forwardRef(
    (props: InputSelectProps, ref: LegacyRef<AsyncReactSelect>) => (
        <InputSelectComponent {...props}>
            <AsyncReactSelect ref={ref as any} />
        </InputSelectComponent>
    )
);
