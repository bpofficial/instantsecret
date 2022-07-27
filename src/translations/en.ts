import { TranslationObj } from "./type";

export const en: TranslationObj = {
    index: {
        copy: {
            coloredTitle: "Create one-time secure links",
            remainingTitle: "for passwords, private messages or sensitive info",
            subtitle:
                "Keep sensitive information out of your email and chat logs with a secret encrypted link that can only be viewed once and then it's gone forever.",
            ctaButton: "WATCH A DEMO",
            securityButton: "How is it secure?",
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
        CreateLink: "Create a Secure Link",
    },
    CreateLinkForm: {
        inputPlaceholder: "Enter secret content here...",
        privacyOptionsTitle: "Privacy Options",
        passphraseLabel: "Passphrase",
        passphrasePlaceholder: "A secure passphrase (Optional)",
        passphraseGenerator: "Generate",
        lifetimeLabel: "Lifetime",
        lifetimeOptions: [{ value: "24hr", label: "24 Hours" }],
        createLinkButton: "CREATE A SECURE LINK",
        disclaimer:
            "A secret link only works once and then it disappears forever.",
    },
    ShareLinkForm: {
        title: "Share this link",
        CopyCTA: "Copy",
        SecureLinkId: "Secure Link",
        Expiry: "Expires in",
        Expired: "Expired",
        BurnButton: "BURN THIS LINK",
        Disclaimer:
            "Burning a secret will delete it before it has been read, you'll need to confirm this action.",
        CreateAnotherButton: "Create another secret",
        EncryptedPlaceholder: "This message is encrypted with your passphrase.",
    },
    BurnLinkForm: {
        SecureLinkId: "Secure link",
        ConfirmButton: "CONFIRM LINK BURN",
        CancelButton: "Cancel",
        Disclaimer: "Burning a secret is permanent and cannot be undone.",
    },
    LinkReceivedForm: {
        SecureLinkId: "Secure link",
        Received: "Received",
        CreateNewLinkButton: "CREATE ANOTHER LINK",
        EncryptedPlaceholder: "This message is encrypted with your passphrase.",
    },
    RevealSecretValueForm: {
        ClickToContinue: "Click to continue",
        ContinueButton: "VIEW SECRET",
        Disclaimer: "The secret will only be shown once.",
        EnterPassphrase: "Enter the passphrase to continue",
        EnterPassphrasePlaceholder: "Passphrase",
    },
    NeverExisted: {
        Title: "Unknown secure link",
        NeverExistedPlaceholder:
            "It either never existed or has already been viewed",
        CreateNewLinkButton: "CREATE A NEW SECURE LINK",
    },
    ViewSecretValueForm: {
        Title: "Your secret message:",
        Disclaimer: "The secret will only be shown once.",
        CreateNewLinkButton: "CREATE A NEW SECURE LINK",
    },
    LinkBurntForm: {
        Title: "Secure link burnt",
        LinkBurntPlaceholder: "This secure link has been destroyed.",
        CreateNewLinkButton: "CREATE A NEW SECURE LINK",
    },
};
