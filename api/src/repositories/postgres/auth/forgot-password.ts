import { IForgotPassword } from '../../../@types/IAuth';
import prisma from '../../../lib/prisma';

export class PostgresForgotPasswordRepository {
    async execute(forgotPasswordParams: IForgotPassword): Promise<void> {
        await prisma.passwordReset.create({
            data: forgotPasswordParams,
        });
    }
}
