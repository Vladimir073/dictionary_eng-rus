import { FC, memo } from 'react';
import { DictionaryModel } from '../../../models/state/dictionary_state.model';
import { Button, ButtonProps, Checkbox, Stack, styled } from '@mui/material';
import { Close } from '@mui/icons-material';

interface IItemDictionary extends DictionaryModel {
    handleOnChecked: (id: string) => void;
    handleDelete: (id: string) => void;
}

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

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
