import { type Request } from 'express';
import { IVerifyEmailUseCase } from '../../interfaces/use-cases';
import { badRequest, ok, serverError } from '../helpers';
import {
    EmailAlreadyVerifiedError,
    ExpiredTokenError,
    InvalidTokenError,
} from '../../errors';
import { verifyEmailSchema } from '../../schemas/email';

export class VerifyEmailController {
    private verifyEmailUseCase: IVerifyEmailUseCase;
    constructor(verifyEmailUseCase: IVerifyEmailUseCase) {
        this.verifyEmailUseCase = verifyEmailUseCase;
    }
    async execute(request: Request) {
        try {
            const { token } = request.query;

            await verifyEmailSchema.parseAsync({ token });

            if (typeof token !== 'string') {
                return badRequest({ message: 'Token inválido' });
            }

            const verifiedToken = await this.verifyEmailUseCase.execute(token);

            return ok({ verifiedToken, message: 'Email verified' });
        } catch (error) {
            if (error instanceof InvalidTokenError) {
                return badRequest({ message: error.message });
            }

            if (error instanceof ExpiredTokenError) {
                return badRequest({ message: error.message });
            }

            if (error instanceof EmailAlreadyVerifiedError) {
                return badRequest({ message: error.message });
            }

            return serverError();
        }
    }
}
