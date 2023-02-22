import { useContext } from 'react';
import { Context, StoreContextType } from '../context/Context';

const useLoading = (): boolean => {
  const { isLoading } = useContext<StoreContextType>(Context);
  return isLoading;
};

export default useLoading;
