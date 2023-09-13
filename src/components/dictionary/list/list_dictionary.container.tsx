import { FC, memo, useEffect, useState } from 'react';
import { DictionaryModel } from '../../../models/state/dictionary_state.model';
import { ItemDictionary } from '../item/item_dictionary.container';
import { CssBaseline } from '@mui/material';
import { localStorageValue } from '../../../constants/localStorage.constants';
import { FormCreateDictionary } from '../../form/form_create_dictionary.container';

export const ListDictionary: FC = memo(() => {
    const [dictionary, setDictionary] = useState<DictionaryModel[]>([]);

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

    function handleDeleteItemDictionary(id: string) {
        const dictionaryFilter = dictionary.filter(item => item.id !== id);
        setDictionary(dictionaryFilter);
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
        </div>
    );
});
