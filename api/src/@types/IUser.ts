export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    email_verified: boolean;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export type IUserSafe = Omit<IUser, 'password'>;

export type IUpdateUser = Pick<IUser, 'name' | 'email' | 'password'>;
