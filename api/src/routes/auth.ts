import { Router, type IRouter, type Request, type Response } from 'express';
import {
    makeForgotPasswordController,
    makeLoginController,
    makeRefreshTokenController,
    makeResetPasswordController,
} from '../factories/controllers';

const authRoutes: IRouter = Router();

authRoutes.post('/', async (request: Request, response: Response) => {
    const loginController = makeLoginController();
    const { statusCode, body } = await loginController.execute(request);

    return response.status(statusCode).send(body);
});

authRoutes.post(
    '/refresh-token',
    async (request: Request, response: Response) => {
        const refreshTokenController = makeRefreshTokenController();
        const { statusCode, body } =
            await refreshTokenController.execute(request);

        return response.status(statusCode).send(body);
    },
);

authRoutes.post(
    '/forgot-password',
    async (request: Request, response: Response) => {
        const forgotPasswordController = makeForgotPasswordController();
        const { statusCode, body } =
            await forgotPasswordController.execute(request);

        return response.status(statusCode).send(body);
    },
);

authRoutes.post(
    '/reset-password',
    async (request: Request, response: Response) => {
        const resetPasswordController = makeResetPasswordController();
        const { statusCode, body } =
            await resetPasswordController.execute(request);

        return response.status(statusCode).send(body);
    },
);

export { authRoutes };
