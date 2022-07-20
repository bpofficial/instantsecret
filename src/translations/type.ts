export interface TranslationObj {
  index: {
    copy: {
      coloredTitle: string;
      remainingTitle: string;
      subtitle: string;
      ctaButton: string;
      securityButton: string;
    }
  },

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
  },
  BasicSetupForm: {
    inputPlaceholder: string;
    privacyOptionsTitle: string;
    passphraseLabel: string;
    passphrasePlaceholder: string;
    passphraseGenerator: string;
    lifetimeLabel: string;
    lifetimeOptions: [
      {
        value: '24hr',
        label: string
      }
    ],
    createLinkButton: string;
    disclaimer: string;
  }
}
