import { IUser } from './IUser';

export type ITokens = {
    accessToken: string;
    refreshToken: string;
};

export type IAuth = IUser & {
    tokens: ITokens;
};
