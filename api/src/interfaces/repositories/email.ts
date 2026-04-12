import { IEmailVerification } from '../../@types/IEmailVerification';

export interface ICreateEmailVerificationRepository {
    execute(user_id: string, token: string, expires_at: Date): Promise<void>;
}

export interface IGetEmailVerificationByTokenRepository {
    execute(token: string): Promise<IEmailVerification | null>;
}

export interface IVerifyEmailRepository {
    execute(token: string, user_id: string): Promise<void>;
}
