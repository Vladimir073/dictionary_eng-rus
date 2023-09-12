import { FC, memo, useCallback, useEffect, useState } from 'react';
import { DictionaryModel } from '../../../models/state/dictionary_state.model';
import { ItemDictionary } from '../item/item_dictionary.container';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/base/Button';
import { FormControl, Input } from '@mui/material';
import { localStorageValue } from '../../../constants/localStorage.constants';

export const ListDictionary: FC = memo(() => {
    const [dictionary, setDictionary] = useState<DictionaryModel[]>([]);
    const [valueEngRus, setValueEngRus] = useState<DictionaryModel>({
        eng: '',
        rus: '',
    });

    const handleSubmit = useCallback(
        (event: React.FormEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if (!valueEngRus.eng || !valueEngRus.rus) {
                return;
            }
            setDictionary([...dictionary, { ...valueEngRus, id: uuidv4() }]);
            localStorage.clear();
            localStorage.setItem(localStorageValue, JSON.stringify(dictionary));
            setValueEngRus({ eng: '', rus: '' });
        },
        [dictionary, valueEngRus],
    );

    useEffect(() => {
        localStorage.clear();
        localStorage.setItem(localStorageValue, JSON.stringify(dictionary));
    }, [dictionary]);

    return (
        <div>
            <h1>Dictionary English-Russia</h1>
            <FormControl>
                <Input
                    type='string'
                    name='eng'
                    value={valueEngRus.eng}
                    onChange={e =>
                        setValueEngRus({
                            ...valueEngRus,
                            eng: e.target.value,
                        })
                    }
                    placeholder='Enter a word'
                />
                <Input
                    type='string'
                    name='rus'
                    value={valueEngRus.rus}
                    onChange={e => setValueEngRus({ ...valueEngRus, rus: e.target.value })}
                    placeholder='Введите слово'
                />
                <Button onClick={handleSubmit}>create</Button>
            </FormControl>

            <ul>
                {dictionary.map(item => {
                    return <ItemDictionary key={item.id} eng={item.eng} rus={item.rus} />;
                })}
            </ul>
        </div>
    );
});
