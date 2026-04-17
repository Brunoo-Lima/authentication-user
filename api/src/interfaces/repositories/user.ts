import type { IUpdateUser, IUser, IUserSafe } from '../../@types/IUser';

export interface ICreateUserRepository {
    execute(user: IUser): Promise<IUserSafe>;
}

export interface IGetUserByEmailRepository {
    execute(email: string): Promise<IUser | null>;
}

export interface IGetUserByIdRepository {
    execute(userId: string): Promise<IUserSafe | null>;
}

export interface IDeleteUserRepository {
    execute(userId: string): Promise<IUserSafe | null>;
}

export interface IUpdateUserRepository {
    execute(
        userId: string,
        updateUserParams: Partial<IUpdateUser>,
    ): Promise<IUserSafe | null>;
}
