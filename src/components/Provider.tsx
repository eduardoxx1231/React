
import React, { useState } from 'react';
import useAsyncEffect from '../hoocks/useAsyncEffect';
import AuthService from '../services/AuthServoce';
import { Context } from '../context/Context';
import { IUser } from '../models/IUser';
import { IWord } from '../models/IWord';
import { StoreContextType } from '../context/Context';
import VocabularyServoce from '../services/VocabularyService';

const u = {
    id:'idetrid',
    email: 'ggg@gg@.com',
    isActivated: true,
    settings: {
        quizes: [
            'Translate',
            'ReverseTranslate',
            'Listen',
            'Spell',
        ]
    }
}

const words: IWord[] = [
    {id: '1', word: 'mention', 
    translation: 'упомянуть', 
    status: 'study', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
    {id: '2', word: 'embed', 
    translation: 'встроить', 
    status: 'study', lastSuccessful: null,  attempts: 0, successfulAttempts: 1,  active: true,},
    {id: '3', word: 'participate', 
    translation: 'учавствовать', 
    status: 'study', lastSuccessful: null,  attempts: 0, successfulAttempts: 2,  active: true,},
    {id: '4', word: 'refuse', 
    translation: 'отказ', 
    status: 'study', lastSuccessful: null,  attempts: 0, successfulAttempts: 3,  active: true,},
    {id: '5', word: 'climb', 
    translation: 'взбираться', 
    status: 'study', lastSuccessful: null,  attempts: 0, successfulAttempts: 2,  active: true,},
    {id: '6', word: 'occupation', 
    translation: 'род деятельности', 
    status: 'learned', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
    {id: '7', word: 'stuff', 
    translation: 'вещи', 
    status: 'study', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
    {id: '8', word: 'staff', 
    translation: 'персонал', 
    status: 'study', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,},
    {id: '9', word: 'particularly', 
    translation: 'в особености', 
    status: 'study', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: false,},
];

export default function Provider(
        { children }: { children: React.ReactNode }
    ) {

    const [user, setUser] = useState<IUser>({} as IUser);
    const [vocabulary, setVocabulary] = useState<IWord[]>(words);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const checkAuth = async () => {
        setIsLoading(true)
        try {
            // TODO Add error connection
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.data.accessToken);
            setIsAuth(true);
            setUser(response.data.user);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (email: string, password: string, callback = () => {}) => {
        try {
            // TODO Add error connection
            // const response = await AuthService.login(email, password);
            // localStorage.setItem('token', response.data.accessToken);
            setIsAuth(true);
            console.log('set user');
            setUser(u as IUser);
            console.log(u);
            // setUser(response.data.user);
            await getVocabulary();
            callback();
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    const registration = async (email: string, password: string, callback = () => {}) => {
        try {
            // TODO Add error connection
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            setIsAuth(true);
            setUser(response.data.user);
            callback();
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

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
            console.log(error.response?.data?.message);
        }
    }

    useAsyncEffect(()=>{
        if (localStorage.getItem('token')) checkAuth();
    }, []);

    const saveStatistic = async (words: IWord[]) => {
        await VocabularyServoce.updateWords(words);
    };

    const getVocabulary = async () => {
        try {
            // setVocabulary(words);
            const response = await VocabularyServoce.getVocabulary();
            setVocabulary(response.data);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    };

    const addWord = async (word: string, translation: string) => {
        try {
            // const response = await VocabularyServoce.addWord(word, translation);
            const data: IWord = {id: String(vocabulary.length), word, translation, 
                status: 'study', lastSuccessful: null,  attempts: 0, successfulAttempts: 0,  active: true,} ;
            const newVocabulary = [data, ...vocabulary];
            // console.log(newVocabulary);
            setVocabulary(newVocabulary);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    };

    const setWordActive = async (id: IWord['id'], active: boolean) => {
        try {
            const newVocabulary = [...vocabulary];
            const wordIndex = newVocabulary.findIndex((item) => item.id === id);
            newVocabulary[wordIndex].active = active;
            // const word = newVocabulary[wordIndex];
            // await VocabularyServoce.updateWord({...word, active})
    
            // console.log(newVocabulary);
            setVocabulary(newVocabulary);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    };

    const value: StoreContextType = { 
        isLoading,
        isAuth, 
        user, 
        login,
        logout, 
        registration,
        vocabulary,
        saveStatistic,
        getVocabulary,
        addWord,
        setWordActive,
    };

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}