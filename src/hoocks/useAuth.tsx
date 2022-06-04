import { useContext } from 'react';
import { Context, StoreContextType } from '../context/Context';

const useAuth = ():Partial<StoreContextType> => {
    const {isAuth, user, login, logout, registration} = useContext<StoreContextType>(Context);
    return  {isAuth, user, login, logout, registration};
}

export default useAuth;