import { FormLabel, useMediaQuery } from '@chakra-ui/react';
import { useTranslation } from '../../../../hooks';

export const LifetimeLabel = ({ shown = '(min-width: 767px)' }) => {
    const translation = useTranslation('CreateLinkForm');

    const [show] = useMediaQuery(shown, { fallback: [false], ssr: true });
    if (!show) return null;

    return <FormLabel>{translation.lifetimeLabel}</FormLabel>;
};
