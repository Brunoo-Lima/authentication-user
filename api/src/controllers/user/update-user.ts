import { type Request } from 'express';
import { IUpdateUserUseCase } from '../../interfaces/use-cases';
import { badRequest, ok, serverError, userNotFoundResponse } from '../helpers';
import { UserNotFoundError } from '../../errors';
import { ZodError } from 'zod';
import { updateUserSchema } from '../../schemas';

export class UpdateUserController {
    private updateUserUseCase: IUpdateUserUseCase;

    constructor(updateUserUseCase: IUpdateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }

    async execute(request: Request) {
        try {
            const userId = request.params.userId as string;
            const params = request.body;

            await updateUserSchema.parseAsync(params);

            const user = await this.updateUserUseCase.execute(userId, params);

            return ok(user);
        } catch (error) {
            console.error(error);

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }

            if (error instanceof ZodError) {
                return badRequest({ message: error.issues[0]?.message });
            }

            return serverError();
        }
    }
}
