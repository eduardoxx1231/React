import api from '../http';
import { AxiosResponse } from 'axios';
import { IWord } from '../models/IWord';

export default class VocabularyService {
  static async getVocabulary(): Promise<AxiosResponse<IWord[]>> {
    return api.get<IWord[]>('/vocabulary');
  }

  static async addWord(
    word: string,
    translation: string,
  ): Promise<AxiosResponse<IWord>> {
    return api.post<IWord>('/vocabulary', { word, translation });
  }

  static async deleteWord(id: string): Promise<AxiosResponse<IWord>> {
    return api.delete<IWord, AxiosResponse<IWord>>('/vocabulary', {
      id,
    } as any);
  }

  static async updateWord(word: Partial<IWord>): Promise<AxiosResponse<IWord>> {
    return api.patch<IWord>('/vocabulary/update', { word });
  }

  static async updateWords(words: Partial<IWord>[]): Promise<AxiosResponse> {
    return api.patch('/vocabulary/updates', { words });
  }
}
