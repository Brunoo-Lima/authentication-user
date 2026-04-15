import { IForgotPassword } from '../../@types/IAuth';

export interface IForgotPasswordRepository {
    execute(forgotPasswordParams: IForgotPassword): Promise<void>;
}

export interface IGetPasswordResetByTokenRepository {
    execute(token: string): Promise<IForgotPassword | null>;
}

export interface IMarkPasswordResetAsUsedRepository {
    execute(token: string): Promise<void>;
}
