import { FC, memo } from 'react';
import { DictionaryModel } from '../../../models/state/dictionary_state.model';
import { Button, Checkbox, Stack, styled } from '@mui/material';
import { Close } from '@mui/icons-material';

interface IItemDictionary extends DictionaryModel {
    handleOnChecked: (id: string) => void;
    handleDelete: (id: string) => void;
}

const ColorButton = styled(Button)({
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '9px',
});

export const ItemDictionary: FC<IItemDictionary> = memo(({ rus, eng, checked, handleOnChecked, handleDelete, id }) => {
    return (
        <Stack direction='row' alignItems='start'>
            <Checkbox checked={checked} color='secondary' onClick={() => handleOnChecked(id)} />
            <p style={{ flex: '1 1', textAlign: 'start', margin: '0', paddingTop: '9px' }}>
                {eng} - {rus}
            </p>

            <ColorButton variant='contained' color='secondary' onClick={() => handleDelete(id)}>
                <Close />
            </ColorButton>
        </Stack>
    );
});
