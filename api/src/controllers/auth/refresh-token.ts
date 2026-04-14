import { type Request } from 'express';
import { IRefreshTokenUseCase } from '../../interfaces/use-cases';
import { badRequest, ok, serverError, unauthorized } from '../helpers';
import { ZodError } from 'zod';
import { UnauthorizedError } from '../../errors';
import { refreshTokenSchema } from '../../schemas';

export class RefreshTokenController {
    private refreshTokenUseCase: IRefreshTokenUseCase;

    constructor(refreshTokenUseCase: IRefreshTokenUseCase) {
        this.refreshTokenUseCase = refreshTokenUseCase;
    }

    async execute(request: Request) {
        try {
            const params = request.body;

            await refreshTokenSchema.parseAsync(params);

            const response = await this.refreshTokenUseCase.execute(
                params.refreshToken,
            );

            return ok(response);
        } catch (error) {
            console.error(error);

            if (error instanceof ZodError) {
                return badRequest({ message: error.issues[0].message });
            }

            if (error instanceof UnauthorizedError) {
                return unauthorized();
            }

            return serverError();
        }
    }
}
