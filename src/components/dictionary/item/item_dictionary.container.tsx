import { FC, memo } from 'react';
import { DictionaryModel } from '../../../models/state/dictionary_state.model';
import { Button, Checkbox, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';

interface IItemDictionary extends DictionaryModel {
    handleOnChecked: (id: string) => void;
    handleDelete: (id: string) => void;
}

export const ItemDictionary: FC<IItemDictionary> = memo(({ rus, eng, checked, handleOnChecked, handleDelete, id }) => {
    return (
        <Stack direction='row'>
            <Checkbox checked={checked} color='secondary' onClick={() => handleOnChecked(id)} />
            <span style={{ flex: '1 1', textAlign: 'start', height: 'auto' }}>
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
        </Stack>
    );
});
