import api from '../http';
import { AxiosResponse } from 'axios';
import { IDictionaryWord } from '../models/IDictionaryWord';

export default class DictionaryServoce {
  static async search(word: string): Promise<AxiosResponse<IDictionaryWord[]>> {
    return api.get<IDictionaryWord[]>('/dictionaryary/search', {
      params: { word },
    });
  }

  static async getFakeWords(word: string): Promise<Partial<IDictionaryWord>[]> {
    const response = await api.get<Partial<IDictionaryWord>[]>(
      '/dictionaryary/fake-words',
      {
        params: { word },
      },
    );
    return response.data;
  }

  static async getFakeTranslationWords(
    word: string,
  ): Promise<Partial<IDictionaryWord>[]> {
    const response = await api.get<Partial<IDictionaryWord>[]>(
      '/dictionaryary/fake-translations',
      {
        params: { word },
      },
    );
    // @TODO rework with return whole response
    return response.data;
  }
}
