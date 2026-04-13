import { IUser } from '../../@types/IUser';

export interface ICreateUserUseCase {
    execute(user: IUser): Promise<IUser>;
}

export interface IGetUserByIdUseCase {
    execute(userId: string): Promise<IUser | null>;
}
