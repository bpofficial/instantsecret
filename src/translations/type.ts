export interface TranslationObj {
    index: {
        copy: {
            coloredTitle: string;
            remainingTitle: string;
            subtitle: string;
            ctaButton: string;
            securityButton: string;
        };
    };

    // Components
    TopBar: {
        logoText: string;
        logoAlt: string;
        logoHiddenText: string;
        SecurityLink: string;
        RoadMapLink: string;
        AboutLink: string;
        SignInLink: string;
        CreateAccountLink: string;
        CreateLink: string;
        Account: string;
    };
    CreateLinkForm: {
        inputPlaceholder: string;
        privacyOptionsTitle: string;
        passphraseLabel: string;
        passphrasePlaceholder: string;
        passphraseGenerator: string;
        lifetimeLabel: string;
        lifetimeOptions: [
            {
                value: "24hr";
                label: string;
            }
        ];
        createLinkButton: string;
        disclaimer: string;
    };
    ShareLinkForm: {
        title: string;
        CopyCTA: string;
        SecureLinkId: string;
        Expiry: string;
        Expired: string;
        BurnButton: string;
        Disclaimer: string;
        CreateAnotherButton: string;
        EncryptedPlaceholder: string;
    };
    BurnLinkForm: {
        SecureLinkId: string;
        ConfirmButton: string;
        CancelButton: string;
        Disclaimer: string;
    };
    LinkReceivedForm: {
        SecureLinkId: string;
        Received: string;
        CreateNewLinkButton: string;
        EncryptedPlaceholder: string;
    };
    RevealSecretValueForm: {
        ClickToContinue: string;
        ContinueButton: string;
        Disclaimer: string;
        EnterPassphrase: string;
        EnterPassphrasePlaceholder: string;
    };
    NeverExisted: {
        Title: string;
        NeverExistedPlaceholder: string;
        CreateNewLinkButton: string;
    };
    ViewSecretValueForm: {
        Title: string;
        Disclaimer: string;
        CreateNewLinkButton: string;
    };
    LinkBurntForm: {
        Title: string;
        LinkBurntPlaceholder: string;
        CreateNewLinkButton: string;
    };
}
