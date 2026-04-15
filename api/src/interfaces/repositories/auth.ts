import { IForgotPassword } from '../../@types/IAuth';

export interface IForgotPasswordRepository {
    execute(forgotPasswordParams: IForgotPassword): Promise<void>;
}
