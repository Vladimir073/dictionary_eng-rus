import { FC, memo, useCallback, useEffect, useState } from 'react';
import { DictionaryModel } from '../../../models/state/dictionary_state.model';
import { ItemDictionary } from '../item/item_dictionary.container';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, Stack, Button, TextField, CssBaseline } from '@mui/material';
import { localStorageValue } from '../../../constants/localStorage.constants';

export const ListDictionary: FC = memo(() => {
    const [dictionary, setDictionary] = useState<DictionaryModel[]>([]);
    const [valueEngRus, setValueEngRus] = useState({
        eng: '',
        rus: '',
    });
    const [validated, setValidated] = useState<boolean>(false);

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if (!valueEngRus.eng || !valueEngRus.rus) {
                setValidated(true);
                return;
            }
            setValidated(false);
            setDictionary([...dictionary, { ...valueEngRus, checked: false, id: uuidv4() }]);
            setValueEngRus({ eng: '', rus: '' });
        },
        [dictionary, valueEngRus],
    );

    function changeChecked(id: string) {
        setDictionary(
            dictionary.map<DictionaryModel>(item => {
                if (item.id === id) {
                    return { ...item, checked: !item.checked };
                } else {
                    return item;
                }
            }),
        );
    }

    useEffect(() => {
        if (localStorage.length) {
            setDictionary(JSON.parse(localStorage.getItem(localStorageValue) || ''));
        }
    }, []);

    useEffect(() => {
        localStorage.clear();
        localStorage.setItem(localStorageValue, JSON.stringify(dictionary));
    }, [dictionary]);

    return (
        <div>
            <CssBaseline />
            <h1>Dictionary English-Russia</h1>
            <FormControl>
                <Stack direction='row' spacing={3}>
                    <TextField
                        error={validated}
                        id='outlined-required'
                        label='english'
                        value={valueEngRus.eng}
                        placeholder='Enter a word'
                        onChange={e => {
                            setValueEngRus({
                                ...valueEngRus,
                                eng: e.target.value,
                            });
                            setValidated(false);
                        }}
                    />
                    <TextField
                        error={validated}
                        id='outlined-required'
                        label='russian'
                        value={valueEngRus.rus}
                        placeholder='Введите слово'
                        onChange={e => {
                            setValueEngRus({ ...valueEngRus, rus: e.target.value });
                            setValidated(false);
                        }}
                    />
                    <Button onClick={handleSubmit} variant='contained' color='secondary'>
                        create
                    </Button>
                </Stack>
            </FormControl>

            <ul>
                {dictionary.map(item => {
                    return (
                        <ItemDictionary
                            key={item.id}
                            id={item.id}
                            eng={item.eng}
                            rus={item.rus}
                            checked={item.checked}
                            handleOnChecked={changeChecked}
                        />
                    );
                })}
            </ul>
        </div>
    );
});
