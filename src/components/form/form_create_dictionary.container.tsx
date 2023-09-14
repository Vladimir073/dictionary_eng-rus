import { Button, FormControl, Stack, TextField } from '@mui/material';
import { FC, memo, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DictionaryModel } from '../../models/state/dictionary_state.model';
import { localStorageValue } from '../../constants/localStorage.constants';

type FormCreate = { dictionary: DictionaryModel[]; setDictionary: (val: DictionaryModel[]) => void };

export const FormCreateDictionary: FC<FormCreate> = memo(({ dictionary, setDictionary }) => {
    const [valueEngRus, setValueEngRus] = useState({
        eng: '',
        rus: '',
    });
    const [validated, setValidated] = useState({ eng: false, rus: false });

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if (!valueEngRus.eng && !valueEngRus.rus) {
                setValidated({ eng: true, rus: true });
                return;
            }
            if (!valueEngRus.eng) {
                setValidated({ ...validated, eng: true });
                return;
            }
            if (!valueEngRus.rus) {
                setValidated({ ...validated, rus: true });
                return;
            }
            let newDictionary = [...dictionary, { ...valueEngRus, checked: false, id: uuidv4() }];
            const completedArray = newDictionary.filter(item => item.checked);
            const uncompletedArray = newDictionary.filter(item => !item.checked);
            setDictionary([...uncompletedArray, ...completedArray]);
            localStorage.clear();
            localStorage.setItem(localStorageValue, JSON.stringify([...uncompletedArray, ...completedArray]));
            setValueEngRus({ eng: '', rus: '' });
        },
        [dictionary, setDictionary, validated, valueEngRus],
    );

    return (
        <FormControl>
            <Stack direction='row' spacing={3}>
                <TextField
                    error={validated.eng}
                    id='outlined-required'
                    label='english'
                    value={valueEngRus.eng}
                    placeholder='Enter a word'
                    onChange={e => {
                        setValueEngRus({
                            ...valueEngRus,
                            eng: e.target.value,
                        });
                        setValidated({ ...validated, eng: false });
                    }}
                />
                <TextField
                    error={validated.rus}
                    id='outlined-required'
                    label='russian'
                    value={valueEngRus.rus}
                    placeholder='Введите слово'
                    onChange={e => {
                        setValueEngRus({ ...valueEngRus, rus: e.target.value });
                        setValidated({ ...validated, rus: false });
                    }}
                />
                <Button onClick={handleSubmit} variant='contained' color='secondary'>
                    create
                </Button>
            </Stack>
        </FormControl>
    );
});
