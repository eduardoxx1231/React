import { createContext } from 'react';
import { IUser } from '../models/IUser';
import { IWord } from '../models/IWord';

export type AuthInFunc = (
  email: string,
  password: string,
  callback?: () => void,
) => Promise<void>;
export type AuthOutFunc = (callback?: () => void) => Promise<void>;
export type SaveStatFunc = (statistc: Partial<IWord>[]) => Promise<void>;
export type GetVocabularyFunc = () => Promise<void>;
export type AddWordFunc = (
  word: string,
  translation: string,
  note?: string,
) => Promise<void>;
export type SetWordActiveFunc = (
  word: IWord['id'],
  active: boolean,
) => Promise<void>;

export interface StoreContextType {
  isLoading: boolean;
  isAuth: boolean;
  isAuthChecked: boolean;
  user: IUser;
  login: AuthInFunc;
  registration: AuthInFunc;
  logout: AuthOutFunc;
  vocabulary: IWord[];
  saveStatistic: SaveStatFunc;
  getVocabulary: GetVocabularyFunc;
  addWord: AddWordFunc;
  setWordActive: SetWordActiveFunc;
  setVoice: (voiceIndex: string) => void;
}

export const Context = createContext<StoreContextType>(null!);
