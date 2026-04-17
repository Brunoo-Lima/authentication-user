import { IUpdateUser, IUser, IUserSafe } from '../../@types/IUser';

export interface ICreateUserUseCase {
    execute(user: IUser): Promise<IUserSafe>;
}

export interface IGetUserByIdUseCase {
    execute(userId: string): Promise<IUserSafe | null>;
}

export interface IDeleteUserUseCase {
    execute(userId: string): Promise<IUserSafe | null>;
}

export interface IUpdateUserUseCase {
    execute(
        userId: string,
        updateUserParams: IUpdateUser,
    ): Promise<IUserSafe | null>;
}
