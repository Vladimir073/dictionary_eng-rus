import { FC, memo, useEffect, useState } from 'react';
import { DictionaryModel } from '../../../models/state/dictionary_state.model';
import { ItemDictionary } from '../item/item_dictionary.container';
import { CssBaseline, Stack } from '@mui/material';
import { localStorageValue } from '../../../constants/localStorage.constants';
import { FormCreateDictionary } from '../../form/form_create_dictionary.container';

export const ListDictionary: FC = memo(() => {
    const [dictionary, setDictionary] = useState<DictionaryModel[]>([]);

    function changeChecked(id: string) {
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
        localStorage.clear();
        localStorage.setItem(localStorageValue, JSON.stringify([...uncompletedArray, ...completedArray]));
    }

    function handleDeleteItemDictionary(id: string) {
        const dictionaryFilter = dictionary.filter(item => item.id !== id);
        setDictionary(dictionaryFilter);
    }

    useEffect(() => {
        if (localStorage.length) {
            setDictionary(JSON.parse(localStorage.getItem(localStorageValue) || ''));
        }
    }, []);

    // useEffect(() => {
    //     const checkedArr = dictionary.filter(item => item.checked);
    //     const uncheckedArr = dictionary.filter(item => !item.checked);
    //     setDictionary([...checkedArr, ...uncheckedArr]);
    // }, [dictionary]);

    return (
        <div style={{ width: '100vw', height: '100vh', textAlign: 'center' }}>
            <Stack sx={{ maxWidth: '500px' }} margin='0 auto'>
                <CssBaseline />
                <h1>Dictionary English-Russia</h1>
                <FormCreateDictionary dictionary={dictionary} setDictionary={setDictionary} />
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
                                handleDelete={handleDeleteItemDictionary}
                            />
                        );
                    })}
                </ul>
            </Stack>
        </div>
    );
});
