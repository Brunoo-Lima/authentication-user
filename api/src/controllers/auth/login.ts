import { type Request } from 'express';
import { ILoginUseCase } from '../../interfaces/use-cases';
import { badRequest, ok, serverError, unauthorized } from '../helpers';
import { loginSchema } from '../../schemas';
import {
    EmailNotVerifiedError,
    InvalidPasswordError,
    UserNotFoundError,
} from '../../errors';
import { ZodError } from 'zod';

export class LoginController {
    private loginUseCase: ILoginUseCase;
    constructor(loginUseCase: ILoginUseCase) {
        this.loginUseCase = loginUseCase;
    }

    async execute(request: Request) {
        try {
            const { email, password } = request.body;
            const userAgent = request.headers['user-agent'];
            const ipAddress = request.ip;

            const sessionData = {
                user_agent: userAgent,
                ip_address:
                    typeof ipAddress === 'string' ? ipAddress : ipAddress?.[0],
            };

            await loginSchema.parseAsync({ email, password });

            const auth = await this.loginUseCase.execute(
                email,
                password,
                sessionData,
            );

            return ok(auth);
        } catch (error) {
            console.error(error);

            if (error instanceof EmailNotVerifiedError) {
                return badRequest({ message: error.message });
            }

            if (
                error instanceof InvalidPasswordError ||
                error instanceof UserNotFoundError
            ) {
                return unauthorized('Invalid credentials');
            }

            if (error instanceof ZodError) {
                return badRequest({ message: error.issues[0].message });
            }

            return serverError();
        }
    }
}
