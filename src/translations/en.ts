import { TranslationObj } from "./type";

export const en: TranslationObj = {
  index: {
    copy: {
      coloredTitle: 'Create one-time secret links',
      remainingTitle: 'for passwords, private messages or sensitive info',
      subtitle: "Keep sensitive information out of your email and chat logs with a secret encrypted link that can only be viewed once and then it's gone forever.",
      ctaButton: 'WATCH A DEMO',
      securityButton: 'How is it secure?'
    }
  },

  // Components
  TopBar: {
    logoText: 'InstantSecret',
    logoAlt: 'Instant Secret Logo',
    logoHiddenText: 'InstantSecret',
    SecurityLink: 'Security',
    RoadMapLink: 'Roadmap',
    AboutLink: 'About',
    SignInLink: 'Sign In',
    CreateAccountLink: 'Create Account'
  },
  BasicSetupForm: {
    inputPlaceholder: 'Enter secret content here...',
    privacyOptionsTitle: 'Privacy Options',
    passphraseLabel: 'Passphrase',
    passphrasePlaceholder: 'A secure passphrase (Optional)',
    passphraseGenerator: 'Generate',
    lifetimeLabel: 'Lifetime',
    lifetimeOptions: [{ value: '24hr', label: '24 Hours' }],
    createLinkButton: 'CREATE A SECRET LINK',
    disclaimer: 'A secret link only works once and then it disappears forever.'
  }
}
