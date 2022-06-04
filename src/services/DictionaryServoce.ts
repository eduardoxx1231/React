import api from '../http';
import { AxiosResponse } from 'axios';
import { IDictionaryWord } from '../models/IDictionaryWord';

export default class DictionaryServoce {
    static async search(word: string): Promise<AxiosResponse<IDictionaryWord[]>> {
        return api.get<IDictionaryWord[]>('/dictionaryary/search', {params: {word}})
    }

	static  getFakeWords(word: string): IDictionaryWord[] {
        const fakeWords: IDictionaryWord[] = [
            { id: '23', word: 'hole', translations: [''] },
            { id: '22', word: 'milk', translations: [''] },
            { id: '21', word: 'done', translations: [''] },
        ]; 
        return fakeWords;
        // return api.get<IDictionaryWord[]>('/dictionaryary/fake-words', {params: {word}});
    }

	static  getFakeTranslationWords(word: string): IDictionaryWord[] {
        const fakeWords: IDictionaryWord[] = [
            { id: '23', word: 'hole', translations: ['rus1'] },
            { id: '22', word: 'milk', translations: ['rus2'] },
            { id: '21', word: 'done', translations: ['rus3'] },
        ]; 
        return fakeWords;
        // return api.get<IDictionaryWord[]>('/dictionaryary/fake-translations', {params: {word}});
    }
    
}