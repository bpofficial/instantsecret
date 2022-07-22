import { FormControl, Input } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { useTranslation } from '../../../../hooks';
import { LifetimeLabel } from './LifetimeLabel';

export const LifetimeInput = () => {
    const form = useFormikContext<any>();
    const translation = useTranslation('CreateLinkForm');

    return (
        <FormControl>
            <LifetimeLabel shown="(max-width: 768px)" />
            <Input
                placeholder="24 Hours"
                value={form.values['ttl'] ?? ''}
                onChange={(evt) => form.setFieldValue('ttl', evt.target.value)}
            />
        </FormControl>
    );
};
