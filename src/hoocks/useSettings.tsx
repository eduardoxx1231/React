import { useContext } from 'react';
import { Context, StoreContextType } from '../context/Context';
import { ISettings } from '../models/ISettings';
interface R extends Partial<StoreContextType> {
  settings: ISettings;
}
const useSettings = (): R => {
  const { user, saveSettings } = useContext<StoreContextType>(Context);

  return { settings: user.settings, saveSettings };
};

export default useSettings;
