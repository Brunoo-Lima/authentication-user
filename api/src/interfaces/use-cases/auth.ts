import { IAuth, ITokens } from '../../@types/IAuth';

export interface ILoginUseCase {
    execute(email: string, password: string): Promise<IAuth>;
}

export interface IRefreshTokenUseCase {
    execute(refreshToken: string): Promise<ITokens>;
}
