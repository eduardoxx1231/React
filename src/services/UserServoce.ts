import api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';
import { ISettings } from '../models/ISettings';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>('/users');
  }

  static async updateSettings(
    id: IUser['id'],
    settings: ISettings,
  ): Promise<AxiosResponse<ISettings>> {
    return api.patch<ISettings>('/users/settings', { id, settings });
  }
}
