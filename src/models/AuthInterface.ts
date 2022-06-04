import { IUser } from './IUser';
export interface AuthInterface {
    accessToken: string;
    user: IUser;
}