import { TranslationObj } from "./type";

export const en: TranslationObj = {
    index: {
        copy: {
            coloredTitle: "Create one-time secure links",
            remainingTitle: "for passwords, private messages or sensitive info",
            subtitle:
                "Keep sensitive information out of your email and chat logs with a secure encrypted link that can only be viewed once and then it's gone forever.",
            ctaButton: "WATCH A DEMO",
            securityButton: "How is it secured?",
        },
    },

    // Components
    TopBar: {
        logoText: "Instant Secure Link",
        logoAlt: "Instant Secure Link Logo",
        logoHiddenText: "Instant Secure Link",
        SecurityLink: "Security",
        RoadMapLink: "Roadmap",
        AboutLink: "About",
        SignInLink: "Sign In",
        CreateAccountLink: "Create Account",
        Account: "Account",
        CreateLink: "Create a Secure Link",
    },
    CreateLinkForm: {
        inputPlaceholder: "Enter secret content here...",
        privacyOptionsTitle: "Optional Privacy Settings",
        passphraseLabel: "Passphrase",
        passphrasePlaceholder: "A secure passphrase",
        passphraseGenerator: "Generate",
        lifetimeLabel: "Lifetime",
        lifetimeOptions: [{ value: "24hr", label: "24 Hours" }],
        createLinkButton: "CREATE A SECURE LINK",
        disclaimer:
            "A secure link only works once and then it disappears forever.",
    },
    ShareLinkForm: {
        title: "Share this link",
        CopyCTA: "Copy",
        SecureLinkId: "Secure Link",
        Expiry: "Expires in",
        Expired: "Expired",
        BurnButton: "BURN THIS LINK",
        Disclaimer:
            "Burning a secure link will delete it before it has been read, you'll need to confirm this action.",
        CreateAnotherButton: "CREATE ANOTHER SECURE LINK",
        EncryptedPlaceholder: "This message is encrypted with your passphrase.",
    },
    BurnLinkForm: {
        SecureLinkId: "Secure link",
        ConfirmButton: "CONFIRM LINK BURN",
        CancelButton: "Cancel",
        Disclaimer: "Burning a secure link is permanent and cannot be undone.",
    },
    LinkReceivedForm: {
        SecureLinkId: "Secure link",
        Received: "Received",
        CreateNewLinkButton: "CREATE ANOTHER LINK",
        EncryptedPlaceholder: "This message is encrypted with your passphrase.",
    },
    RevealSecretValueForm: {
        ClickToContinue: "Click to continue",
        ContinueButton: "VIEW SECURE CONTENT",
        Disclaimer: "The secure content will only be shown once.",
        EnterPassphrase: "Enter the passphrase to continue",
        EnterPassphrasePlaceholder: "Passphrase",
    },
    NeverExisted: {
        Title: "Unknown secure link",
        NeverExistedPlaceholder:
            "It either never existed, has already been viewed or expired.",
        CreateNewLinkButton: "CREATE A NEW SECURE LINK",
    },
    ViewSecretValueForm: {
        Title: "Your secure content:",
        Disclaimer:
            "This secure link has been burnt, the content cannot be accessed again.",
        CreateNewLinkButton: "CREATE A NEW SECURE LINK",
    },
    LinkBurntForm: {
        Title: "Secure link burnt",
        LinkBurntPlaceholder: "This secure link has been destroyed.",
        CreateNewLinkButton: "CREATE A NEW SECURE LINK",
    },
};
