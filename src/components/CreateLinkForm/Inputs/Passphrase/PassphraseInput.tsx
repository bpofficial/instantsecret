import {
    Button,
    FormControl,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { generatePassphrase } from '../../../../utils/generatePassphrase';
import { useTranslation } from '../../../../hooks';
import { PassphraseLabel } from './PassphraseLabel';
import { useFormikContext } from 'formik';

export const PassphraseInput = () => {
    const form = useFormikContext<any>();
    const translation = useTranslation('CreateLinkForm');

    const onClick = () => {
        const pwd = generatePassphrase();
        form.setFieldValue('passphrase', pwd);
    };

    return (
        <FormControl>
            <PassphraseLabel shown="(max-width: 768px)" />
            <InputGroup>
                <Input
                    placeholder={translation.passphrasePlaceholder}
                    value={form.values['passphrase'] ?? ''}
                    onChange={(evt) =>
                        form.setFieldValue('passphrase', evt.target.value)
                    }
                />
                <InputRightElement width="5rem" pr="1">
                    <Button size="xs" {...{ onClick }}>
                        {translation.passphraseGenerator}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
    );
};
