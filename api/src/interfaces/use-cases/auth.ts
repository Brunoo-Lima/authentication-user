import { IAuth, ITokens } from '../../@types/IAuth';

export interface ILoginUseCase {
    execute(
        email: string,
        password: string,
        session: {
            ip_address?: string;
            user_agent?: string;
        },
    ): Promise<IAuth>;
}

export interface IRefreshTokenUseCase {
    execute(refreshToken: string): Promise<ITokens>;
}

export interface IForgotPasswordUseCase {
    execute(email: string): Promise<void>;
}
