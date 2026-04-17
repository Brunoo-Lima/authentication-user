import { JwtPayload } from 'jsonwebtoken';
import { IUserSafe } from './IUser';

export type ITokens = {
    accessToken: string;
    refreshToken: string;
};

export type IAuth = IUserSafe & {
    tokens: ITokens;
};

export type IDecodedToken = JwtPayload & {
    userId: string;
};

export interface IForgotPassword {
    token: string;
    expires_at: Date;
    used_at?: Date | null;
    user_id: string;
}
