import { IUser } from './IUser';

export type IAuth = IUser & {
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
};
