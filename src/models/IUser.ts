import { ISettings } from './ISettings';

export interface IUser {
    id: string;
    email: string;
    isActivated: boolean;
    settings: ISettings;
}