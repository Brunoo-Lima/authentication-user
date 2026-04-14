import { Router, type IRouter, type Request, type Response } from 'express';
import { makeVerifyEmail } from '../factories/controllers/email';

const emailRoutes: IRouter = Router();

const handleVerifyEmail = async (request: Request, response: Response) => {
    const verifyEmailController = makeVerifyEmail();
    const { statusCode, body } = await verifyEmailController.execute(request);

    return response.status(statusCode).send(body);
};

emailRoutes.get('/verify', handleVerifyEmail);
// emailRoutes.post('/verify', handleVerifyEmail);

export { emailRoutes };
