import { memo } from 'react';
import { ListDictionary } from './components/dictionary/list/list_dictionary.container';

function App() {
    return <ListDictionary />;
}

export default memo(App);
