import { FC, memo } from 'react';
import { DictionaryModel } from '../../../models/state/dictionary_state.model';
import { Button, Checkbox } from '@mui/material';
import { Close } from '@mui/icons-material';

interface IItemDictionary extends DictionaryModel {
    handleOnChecked: (id: string) => void;
    handleDelete: (id: string) => void;
}

export const ItemDictionary: FC<IItemDictionary> = memo(({ rus, eng, checked, handleOnChecked, handleDelete, id }) => {
    return (
        <li>
            <Checkbox checked={checked} color='secondary' onClick={() => handleOnChecked(id)} />
            <span>
                {eng} - {rus}
            </span>
            <Button
                variant='contained'
                color='secondary'
                size='small'
                sx={{ width: 30 }}
                onClick={() => handleDelete(id)}
            >
                <Close />
            </Button>
        </li>
    );
});
