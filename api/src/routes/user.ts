import { Router, type IRouter, type Request, type Response } from 'express';
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from '../factories/controllers';
import { auth } from '../middlewares/auth';

const userRoutes: IRouter = Router();

userRoutes.post('/', async (request: Request, response: Response) => {
    const createUserController = makeCreateUserController();
    const { statusCode, body } = await createUserController.execute(request);

    return response.status(statusCode).send(body);
});

userRoutes.get(
    '/me/:userId',
    auth,
    async (request: Request, response: Response) => {
        const getUserByIdController = makeGetUserByIdController();
        const { statusCode, body } =
            await getUserByIdController.execute(request);

        return response.status(statusCode).send(body);
    },
);

userRoutes.patch(
    '/me/:userId',
    auth,
    async (request: Request, response: Response) => {
        const updateUserController = makeUpdateUserController();
        const { statusCode, body } =
            await updateUserController.execute(request);

        return response.status(statusCode).send(body);
    },
);

userRoutes.delete(
    '/me/:userId',
    auth,
    async (request: Request, response: Response) => {
        const deleteUserController = makeDeleteUserController();
        const { statusCode, body } =
            await deleteUserController.execute(request);

        return response.status(statusCode).send(body);
    },
);

export { userRoutes };
