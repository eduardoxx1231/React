import React, { useState } from 'react';
import useAsyncEffect from '../hoocks/useAsyncEffect';
import AuthService from '../services/AuthServoce';
import { AddWordFunc, Context } from '../context/Context';
import { IUser } from '../models/IUser';
import { ISettings } from '../models/ISettings';
import { IWord } from '../models/IWord';
import { StoreContextType } from '../context/Context';
import VocabularyServoce from '../services/VocabularyService';
import { useErrorHandling } from '../hoocks/useErrorHandling';
import UserService from '../services/UserServoce';

export default function Provider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>(null);
  const [vocabulary, setVocabulary] = useState<IWord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);
  const { triggerError } = useErrorHandling();

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      // TODO Add error connection
      const response = await AuthService.refresh();
      localStorage.setItem('token', response.data.accessToken);
      setUser({ ...response.data.user });
      await getVocabulary();
      setIsAuth(true);
    } catch (error: any) {
      triggerError(error);
    }
    setIsLoading(false);
    setIsAuthChecked(true);
  };

  const login = async (
    email: string,
    password: string,
    callback = () => {},
  ) => {
    setIsLoading(true);
    try {
      // TODO Add error connection
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      setUser({ ...response.data.user });
      await getVocabulary();
      setIsAuth(true);
      callback();
    } catch (error: any) {
      triggerError(error.response?.data ? error.response?.data : error);
    }
    setIsLoading(false);
  };

  const registration = async (
    email: string,
    password: string,
    callback = () => {},
  ) => {
    try {
      // TODO Add error connection
      const response = await AuthService.registration(email, password);
      localStorage.setItem('token', response.data.accessToken);
      setIsAuth(true);
      setUser(response.data.user);
      callback();
    } catch (error: any) {
      triggerError(error.response?.data ? error.response?.data : error);
    }
  };

  const logout = async (callback = () => {}) => {
    try {
      // TODO Add error connection
      await AuthService.logout();
      localStorage.removeItem('token');
      setIsAuth(false);
      setUser({} as IUser);
      setVocabulary([]);
      callback();
    } catch (error: any) {
      triggerError(error.response?.data ? error.response?.data : error);
    }
  };

  useAsyncEffect(async () => {
    if (localStorage.getItem('token')) await checkAuth();
  }, []);

  const saveStatistic = async (wordsStatistic: Partial<IWord>[]) => {
    try {
      await VocabularyServoce.updateWords(wordsStatistic);
      await getVocabulary();
    } catch (error: any) {
      triggerError(error.response?.data ? error.response?.data : error);
    }
  };
  // TODO move to utils
  const sortVocabulary = (voc: IWord[]) => {
    // @TODO Add list of learned
    const sorted = voc.filter((w) => w.status !== 'learned');
    return sorted.sort((a, b) => {
      if (a.active && b.active) return 0;
      if ((a.active && !b.active) || b.status === 'learned') return -1;
      return 1;
    });
  };

  const getVocabulary = async () => {
    try {
      const response = await VocabularyServoce.getVocabulary();
      setVocabulary(sortVocabulary(response.data));
    } catch (error: any) {
      triggerError(error.response?.data ? error.response?.data : error);
    }
  };

  const addWord: AddWordFunc = async (word, translation, note) => {
    try {
      const response = await VocabularyServoce.addWord(word, translation, note);
      const newVocabulary = [...vocabulary, response.data];
      setVocabulary(newVocabulary);
    } catch (error: any) {
      triggerError(error.response?.data ? error.response?.data : error);
    }
  };

  const setWordActive = async (id: IWord['id'], active: boolean) => {
    try {
      const newVocabulary = [...vocabulary];
      const wordIndex = newVocabulary.findIndex((item) => item.id === id);
      newVocabulary[wordIndex].active = active;
      await VocabularyServoce.updateWord({ id, active });

      setVocabulary(newVocabulary);
    } catch (error: any) {
      triggerError(error.response?.data ? error.response?.data : error);
    }
  };

  const saveSettings = async (settings: ISettings) => {
    if (!user) return;
    const updateSettings = { ...user.settings, ...settings };
    const updateUser = { ...user };
    updateUser.settings = updateSettings;
    setUser(updateUser);
    setIsLoading(true);
    try {
      await UserService.updateSettings(user.id, updateSettings);
    } catch (error: any) {
      triggerError(error.response?.data ? error.response?.data : error);
    }
    setIsLoading(false);
  };

  const value: StoreContextType = {
    isLoading,
    isAuth,
    isAuthChecked,
    user,
    login,
    logout,
    registration,
    vocabulary,
    saveStatistic,
    getVocabulary,
    addWord,
    setWordActive,
    saveSettings,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
