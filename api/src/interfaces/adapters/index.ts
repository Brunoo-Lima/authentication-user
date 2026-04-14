import { IDecodedToken, ITokens } from '../../@types/IAuth';

export interface IIdGeneratorAdapter {
    execute(): string;
}

export interface IEmailAdapter {
    sendVerificationEmail(to: string, token: string): Promise<void>;
}

export interface IPasswordComparatorAdapter {
    execute(password: string, hashedPassword: string): Promise<boolean>;
}

export interface IPasswordHashAdapter {
    execute(password: string): Promise<string>;
}

export interface ITokenEmailGeneratorAdapter {
    execute(): string;
}

export interface ITokensGeneratorAdapter {
    execute(userId: string): ITokens;
}

export interface ITokenVerifierAdapter {
    execute(token: string, secret: string): IDecodedToken;
}
