import { FC, memo, useCallback, useEffect, useState } from 'react';
import { DictionaryModel } from '../../../models/state/dictionary_state.model';
import { ItemDictionary } from '../item/item_dictionary.container';
import { CssBaseline, Stack } from '@mui/material';
import { localStorageValue } from '../../../constants/localStorage.constants';
import { FormCreateDictionary } from '../../form/form_create_dictionary.container';

export const ListDictionary: FC = memo(() => {
    const [dictionary, setDictionary] = useState<DictionaryModel[]>([]);

    const changeChecked = useCallback(
        (id: string) => {
            const updateDictionary = dictionary.map<DictionaryModel>(item => {
                if (item.id === id) {
                    return { ...item, checked: !item.checked };
                } else {
                    return item;
                }
            });
            const completedArray = updateDictionary.filter(item => item.checked);
            const uncompletedArray = updateDictionary.filter(item => !item.checked);
            setDictionary([...uncompletedArray, ...completedArray]);
            localStorage.removeItem(localStorageValue);
            localStorage.setItem(localStorageValue, JSON.stringify([...uncompletedArray, ...completedArray]));
        },
        [dictionary],
    );

    function handleDeleteItemDictionary(id: string) {
        const dictionaryFilter = dictionary.filter(item => item.id !== id);
        setDictionary(dictionaryFilter);
        localStorage.removeItem(localStorageValue);
        localStorage.setItem(localStorageValue, JSON.stringify(dictionaryFilter));
    }

    useEffect(() => {
        if (localStorage.length > 0 && localStorage.getItem(localStorageValue) !== null) {
            setDictionary(JSON.parse(localStorage.getItem(localStorageValue) || ''));
        }
    }, []);

    return (
        <div
            style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', textAlign: 'center' }}
        >
            <Stack sx={{ maxWidth: '500px', p: ' 0 10px' }}>
                <CssBaseline />
                <h1>Dictionary English-Russia</h1>
                <FormCreateDictionary dictionary={dictionary} setDictionary={setDictionary} />
                <Stack spacing={1} sx={{ mt: '15px' }}>
                    {dictionary.map(item => {
                        return (
                            <ItemDictionary
                                key={item.id}
                                id={item.id}
                                eng={item.eng}
                                rus={item.rus}
                                checked={item.checked}
                                handleOnChecked={changeChecked}
                                handleDelete={handleDeleteItemDictionary}
                            />
                        );
                    })}
                </Stack>
            </Stack>
        </div>
    );
});
