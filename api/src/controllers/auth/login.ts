import { type Request } from 'express';
import { ILoginUseCase } from '../../interfaces/use-cases';
import { badRequest, ok, serverError } from '../helpers';
import { loginSchema } from '../../schemas';
import { EmailNotVerifiedError } from '../../errors';

export class LoginController {
    private loginUseCase: ILoginUseCase;
    constructor(loginUseCase: ILoginUseCase) {
        this.loginUseCase = loginUseCase;
    }

    async execute(request: Request) {
        try {
            const { email, password } = request.body;

            await loginSchema.parseAsync({ email, password });

            const auth = await this.loginUseCase.execute(email, password);

            return ok(auth);
        } catch (error) {
            console.error(error);

            if (error instanceof EmailNotVerifiedError) {
                return badRequest({ message: error.message });
            }

            return serverError();
        }
    }
}
