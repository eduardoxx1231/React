import { useContext } from 'react';
import { Context, StoreContextType } from '../context/Context';


const useVocabulary = ():Partial<StoreContextType> => {
    const { vocabulary, addWord, setWordActive } = useContext<StoreContextType>(Context);
    return { vocabulary, addWord, setWordActive };
}

export default useVocabulary;