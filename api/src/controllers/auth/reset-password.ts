import { type Request } from 'express';
import { ZodError } from 'zod';
import { resetPasswordSchema } from '../../schemas';
import { badRequest, ok, serverError } from '../helpers';
import { ExpiredTokenError, InvalidTokenError } from '../../errors';
import { IResetPasswordUseCase } from '../../interfaces/use-cases';

export class ResetPasswordController {
    private resetPasswordUseCase: IResetPasswordUseCase;

    constructor(resetPasswordUseCase: IResetPasswordUseCase) {
        this.resetPasswordUseCase = resetPasswordUseCase;
    }

    async execute(request: Request) {
        try {
            const { token, password } = request.body;

            await resetPasswordSchema.parseAsync({ token, password });

            await this.resetPasswordUseCase.execute(token, password);

            return ok({ message: 'Senha redefinida com sucesso' });
        } catch (error) {
            console.error(error);

            if (error instanceof ZodError) {
                return badRequest({ message: error.issues[0].message });
            }

            if (
                error instanceof InvalidTokenError ||
                error instanceof ExpiredTokenError
            ) {
                return badRequest({ message: error.message });
            }

            return serverError();
        }
    }
}
