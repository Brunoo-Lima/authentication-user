import { IdGeneratorAdapter, PasswordHashAdapter } from '../../adapters';
import { CreateUserController } from '../../controllers';
import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
} from '../../repositories/postgres';
import { CreateUserUseCase } from '../../use-cases';

export const makeCreateUserController = () => {
    const createUserRepository = new PostgresCreateUserRepository();
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const passwordHashAdapter = new PasswordHashAdapter();
    const idGeneratorAdapter = new IdGeneratorAdapter();

    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
        passwordHashAdapter,
        idGeneratorAdapter,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};
