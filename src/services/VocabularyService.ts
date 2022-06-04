import api from '../http';
import { AxiosResponse } from 'axios';
import { IWord } from '../models/IWord';

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

export default class VocabularyService {
    
    static async getVocabulary(): Promise<any> {
        return {data: words};
    }
    // static async getVocabulary(): Promise<AxiosResponse<IWord[]>> {
    //     return api.get<IWord[]>('/vocabulary');
    // }

	static async addWord(word: string, transaltion: string): Promise<AxiosResponse<IWord>> {
        return api.post<IWord>('/vocabulary/add', {word, transaltion});
    }

	static async updateWord(word: IWord): Promise<AxiosResponse<IWord>> {
        return api.patch<IWord>('/vocabulary/update', {word});
    }

	static async updateWords(words: IWord[]): Promise<AxiosResponse<IWord[]>> {
        return api.put<IWord[]>('/vocabulary/updates', {words});
    }
}