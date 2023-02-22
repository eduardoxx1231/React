import { useContext } from 'react';
import { Context, StoreContextType } from '../context/Context';
import { ISettings } from '../models/ISettings';
interface R extends Partial<StoreContextType> {
  settings: ISettings;
}
const useSettings = (): R => {
  const { user, setVoice } = useContext<StoreContextType>(Context);

  return { settings: user.settings, setVoice };
};

export default useSettings;
