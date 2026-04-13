import { type Request } from 'express';
import { IGetUserByIdUseCase } from '../../interfaces/use-cases';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers';

export class GetUserByIdController {
    private getUserByIdUseCase: IGetUserByIdUseCase;

    constructor(getUserByIdUseCase: IGetUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }

    async execute(request: Request) {
        try {
            const userId = request.params.userId as string;

            const isIdValid = checkIfIdIsValid(userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const user = await this.getUserByIdUseCase.execute(userId);

            if (!user) {
                return userNotFoundResponse();
            }

            return ok(user);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
