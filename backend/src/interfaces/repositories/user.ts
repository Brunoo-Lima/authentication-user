import type { IUser } from '../../@types/IUser';

export interface ICreateUserRepository {
    execute(user: IUser): Promise<IUser>;
}

export interface IGetUserByEmailRepository {
    execute(email: string): Promise<IUser | null>;
}

export interface ICreateEmailVerificationRepository {
    execute(user_id: string, token: string, expires_at: Date): Promise<void>;
}
