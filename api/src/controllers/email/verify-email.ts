import { type Request } from 'express';
import { IVerifyEmailUseCase } from '../../interfaces/use-cases';
import { badRequest, ok, serverError } from '../helpers';
import {
    EmailAlreadyVerifiedError,
    ExpiredTokenError,
    InvalidTokenError,
} from '../../errors';
import { verifyEmailSchema } from '../../schemas/email';
import { ZodError } from 'zod';

export class VerifyEmailController {
    private verifyEmailUseCase: IVerifyEmailUseCase;
    constructor(verifyEmailUseCase: IVerifyEmailUseCase) {
        this.verifyEmailUseCase = verifyEmailUseCase;
    }
    async execute(request: Request) {
        try {
            const { token } = request.query;

            await verifyEmailSchema.parseAsync({ token });

            const verifiedToken = await this.verifyEmailUseCase.execute(
                token as string,
            );

            return ok({ verifiedToken, message: 'Email verified' });
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.issues[0].message });
            }

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
