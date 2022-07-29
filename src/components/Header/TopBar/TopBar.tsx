import { useUser } from "@auth0/nextjs-auth0";
import {
    ArrowForwardIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CloseIcon,
    HamburgerIcon,
} from "@chakra-ui/icons";
import {
    Box,
    Button,
    chakra,
    Collapse,
    Flex,
    Icon,
    IconButton,
    Link,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
    VisuallyHidden,
} from "@chakra-ui/react";
import Image from "next/image";
import { PAGE_MAX } from "../../../constants";
import { useLocaleLink, useTranslation } from "../../../hooks";

export const TopBar = () => {
    const translation = useTranslation("TopBar");
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Flex
                bg={useColorModeValue("white", "gray.800")}
                color={useColorModeValue("gray.600", "white")}
                minH={"60px"}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.900")}
                align={"center"}
                justifyContent={"space-between"}
            >
                <Flex
                    flex={{ base: 8 }}
                    justifyContent="space-between"
                    maxW={PAGE_MAX}
                    px={["2", "2", "4", "4", "4", "8"]}
                    margin={"auto"}
                >
                    <Flex>
                        <chakra.a
                            href="/"
                            title="Instant Secret"
                            display="flex"
                            alignItems="center"
                        >
                            <Box mt="1">
                                <Image
                                    src="/assets/logo.svg"
                                    width="25px"
                                    height="25px"
                                    alt={translation.logoAlt}
                                />
                            </Box>
                            <VisuallyHidden>
                                {translation.logoHiddenText}
                            </VisuallyHidden>
                            <chakra.h1
                                fontSize="xl"
                                fontWeight="semibold"
                                ml="2"
                                color="custom.400"
                            >
                                {translation.logoText}
                            </chakra.h1>
                        </chakra.a>
                    </Flex>

                    <Flex display={{ base: "none", md: "flex" }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>
                <Flex
                    flex={{ base: 1, md: "auto" }}
                    display={{ base: "flex", md: "none" }}
                    justifyContent="flex-end"
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? (
                                <CloseIcon w={3} h={3} />
                            ) : (
                                <HamburgerIcon w={5} h={5} />
                            )
                        }
                        variant={"ghost"}
                        aria-label={"Toggle Navigation"}
                    />
                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
};

const DesktopNav = () => {
    const translations = useTranslation("TopBar");
    const localLink = useLocaleLink();
    const user = useUser();
    const NavItems = getNavItems(
        translations,
        localLink,
        user.user && !user.isLoading && !user.error
    );

    const linkColor = useColorModeValue("gray.600", "gray.200");
    const linkHoverColor = useColorModeValue("gray.800", "white");
    const popoverContentBgColor = useColorModeValue("white", "gray.800");

    const ctaProps = {
        bg: "custom.400",
        color: "white",
        borderRadius: "md",
        fontWeight: "500",
        _hover: {
            textDecoration: "none",
            bg: "custom.50",
        },
    };

    const defaultProps = {
        color: "custom.400",
        _hover: {
            textDecoration: "none",
            color: linkHoverColor,
        },
    };

    return (
        <Stack direction={"row"} spacing={4}>
            {NavItems.map((navItem) => (
                <Box key={navItem.label} alignSelf={"center"}>
                    <Popover trigger={"hover"} placement={"bottom-start"}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? "#"}
                                fontSize={"sm"}
                                fontWeight={600}
                                {...(navItem.cta ? ctaProps : defaultProps)}
                            >
                                {navItem.label}
                                {navItem.cta ? (
                                    <ArrowForwardIcon ml={"1"} mb={"0.5"} />
                                ) : null}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={"xl"}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={"xl"}
                                minW={"sm"}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav
                                            key={child.label}
                                            {...child}
                                        />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Link
            href={href}
            role={"group"}
            display={"block"}
            p={2}
            rounded={"md"}
            _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
        >
            <Stack direction={"row"} align={"center"}>
                <Box>
                    <Text
                        transition={"all .3s ease"}
                        _groupHover={{ color: "pink.400" }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text fontSize={"sm"}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={"all .3s ease"}
                    transform={"translateX(-10px)"}
                    opacity={0}
                    _groupHover={{
                        opacity: "100%",
                        transform: "translateX(0)",
                    }}
                    justify={"flex-end"}
                    align={"center"}
                    flex={1}
                >
                    <Icon
                        color={"pink.400"}
                        w={5}
                        h={5}
                        as={ChevronRightIcon}
                    />
                </Flex>
            </Stack>
        </Link>
    );
};

const MobileNav = () => {
    const translations = useTranslation("TopBar");
    const localLink = useLocaleLink();
    const user = useUser();
    const NavItems = getNavItems(
        translations,
        localLink,
        user.user && !user.isLoading && !user.error
    );

    return (
        <Stack
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            display={{ md: "none" }}
        >
            {NavItems.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href, cta }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure();
    const color = useColorModeValue("gray.600", "gray.200");

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? "#"}
                justify={"space-between"}
                align={"center"}
                _hover={{
                    textDecoration: "none",
                }}
            >
                {cta ? (
                    <>
                        <Button
                            w="100%"
                            bg="custom.400"
                            _hover={{ bg: "custom.50" }}
                            color="white"
                        >
                            <Flex align="center">
                                <Text fontWeight="bold">{label}</Text>
                                <ArrowForwardIcon ml="2" mt="0.5" />
                            </Flex>
                        </Button>
                    </>
                ) : (
                    <>
                        <Text fontWeight={600} color={color}>
                            {label}
                        </Text>
                        {children && (
                            <Icon
                                as={ChevronDownIcon}
                                transition={"all .25s ease-in-out"}
                                transform={isOpen ? "rotate(180deg)" : ""}
                                w={6}
                                h={6}
                            />
                        )}
                    </>
                )}
            </Flex>

            <Collapse
                in={isOpen}
                animateOpacity
                style={{ marginTop: "0!important" }}
            >
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={"solid"}
                    borderColor={useColorModeValue("gray.200", "gray.700")}
                    align={"start"}
                >
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
    cta?: boolean;
}

const getNavItems = (
    translations: Record<string, string>,
    localeLink: ReturnType<typeof useLocaleLink>,
    loggedIn = false
) => {
    return [
        {
            label: translations["SecurityLink"],
            href: localeLink`/security`,
        },
        {
            label: translations["RoadMapLink"],
            href: localeLink`/roadmap`,
        },
        loggedIn
            ? {
                  label: translations["Account"],
                  href: localeLink`/account`,
              }
            : {
                  label: translations["SignInLink"],
                  href: "/api/auth/login",
              },
        {
            label: translations["CreateLink"],
            href: localeLink`/links`,
        },
    ] as NavItem[];
};

//
// <HStack
//     spacing={1}
//     mr={1}
//     color="brand.500"
//     display={{
//         base: 'none',
//         md: 'inline-flex',
//     }}
// >
//     <Button
//         variant="ghost"
//         fontWeight="normal"
//         as="a"
//         href={localeLink`/security`}
//         rel="noopener"
//     >
//         {translation.SecurityLink}
//     </Button>
//     <Button
//         variant="ghost"
//         fontWeight="normal"
//         as="a"
//         href={localeLink`/roadmap`}
//         rel="noopener"
//     >
//         {translation.RoadMapLink}
//     </Button>
//     <Button
//         variant="ghost"
//         fontWeight="normal"
//         as="a"
//         href={localeLink`/links`}
//         rel="noopener"
//     >
//         {translation.CreateLink}
//     </Button>
//     {/* <Button
//                                 variant="ghost"
//                                 fontWeight="normal"
//                                 as="a"
//                                 href="/signin"
//                                 rel="noopener"
//                             >
//                                 {translation.SignInLink}
//                             </Button>
//                             <Button
//                                 variant="ghost"
//                                 fontWeight="normal"
//                                 as="a"
//                                 href="/create-account"
//                                 rel="noopener"
//                             >
//                                 {translation.CreateAccountLink}
//                             </Button> */}
// </HStack>
