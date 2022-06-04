import { useContext } from 'react';
import { Context, StoreContextType } from '../context/Context';

const useStatistic = ():Partial<StoreContextType> => {
    const {saveStatistic} = useContext<StoreContextType>(Context);
    return  {saveStatistic};
}

export default useStatistic;