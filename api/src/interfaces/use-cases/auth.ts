import { IAuth } from '../../@types/IAuth';

export interface ILoginUseCase {
    execute(email: string, password: string): Promise<IAuth>;
}
