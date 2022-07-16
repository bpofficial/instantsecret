import { FormLabel, useMediaQuery } from '@chakra-ui/react';
import { useTranslation } from '../../../../hooks';

export const PassphraseLabel = ({ shown = '(min-width: 767px)' }) => {
  const translation = useTranslation('BasicSetupForm');

  const [show] = useMediaQuery(shown);
  if (!show) return null;

  return <FormLabel>{translation.passphraseLabel}</FormLabel>;
};
