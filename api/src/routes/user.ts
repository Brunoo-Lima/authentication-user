import { Router, type IRouter, type Request, type Response } from 'express';
import { makeCreateUserController } from '../factories/controllers';

const userRoutes: IRouter = Router();

userRoutes.post('/', async (request: Request, response: Response) => {
    const createUserController = makeCreateUserController();
    const { statusCode, body } = await createUserController.execute(request);

    return response.status(statusCode).send(body);
});

export { userRoutes };
