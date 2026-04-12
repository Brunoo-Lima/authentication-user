import { Router, type IRouter, type Request, type Response } from 'express';
import { makeVerifyEmail } from '../factories/controllers/email';

const emailRoutes: IRouter = Router();

emailRoutes.post('/verify', async (request: Request, response: Response) => {
    const verifyEmailController = makeVerifyEmail();
    const { statusCode, body } = await verifyEmailController.execute(request);

    return response.status(statusCode).send(body);
});

export { emailRoutes };
