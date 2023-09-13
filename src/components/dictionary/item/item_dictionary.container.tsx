import { FC, memo } from 'react';
import { DictionaryModel } from '../../../models/state/dictionary_state.model';
import { Checkbox } from '@mui/material';

interface IItemDictionary extends DictionaryModel {
    handleOnChecked: (id: string) => void;
}

export const ItemDictionary: FC<IItemDictionary> = memo(({ rus, eng, checked, handleOnChecked, id }) => {
    return (
        <li>
            <Checkbox checked={checked} color='secondary' onClick={() => handleOnChecked(id)} />
            <span>
                {eng} - {rus}
            </span>
        </li>
    );
});
