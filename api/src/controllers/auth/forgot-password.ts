import { type Request } from 'express';
import { IForgotPasswordUseCase } from '../../interfaces/use-cases';
import { badRequest, ok, serverError } from '../helpers';
import { forgotPasswordSchema } from '../../schemas';
import { ZodError } from 'zod';

export class ForgotPasswordController {
    private forgotPasswordUseCase: IForgotPasswordUseCase;

    constructor(forgotPasswordUseCase: IForgotPasswordUseCase) {
        this.forgotPasswordUseCase = forgotPasswordUseCase;
    }

    async execute(request: Request) {
        try {
            const params = request.body;

            await forgotPasswordSchema.parseAsync(params);

            await this.forgotPasswordUseCase.execute(params.email);

            return ok({
                message: 'Se o e-mail existir, enviaremos as instruções',
            });
        } catch (error) {
            console.error(error);

            if (error instanceof ZodError) {
                return badRequest({ message: error.issues[0].message });
            }
            return serverError();
        }
    }
}
