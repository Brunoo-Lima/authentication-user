import { PasswordComparatorAdapter } from '../../adapters';
import { LoginController } from '../../controllers';
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres';
import { LoginUseCase } from '../../use-cases/auth/login';

export const makeLoginController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const passwordComparatorAdapter = new PasswordComparatorAdapter();
    const loginUseCase = new LoginUseCase(
        getUserByEmailRepository,
        passwordComparatorAdapter,
    );

    const loginController = new LoginController(loginUseCase);

    return loginController;
};
