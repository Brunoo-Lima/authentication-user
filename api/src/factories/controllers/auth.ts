import { LoginController } from '../../controllers';
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres';
import { LoginUseCase } from '../../use-cases/auth/login';

export const makeLoginController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const loginUseCase = new LoginUseCase(getUserByEmailRepository);

    const loginController = new LoginController(loginUseCase);

    return loginController;
};
