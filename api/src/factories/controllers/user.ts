import { IdGeneratorAdapter, PasswordHashAdapter } from '../../adapters';
import { CreateUserController, GetUserByIdController } from '../../controllers';
import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
} from '../../repositories/postgres';
import { CreateUserUseCase, GetUserByIdUseCase } from '../../use-cases';

export const makeCreateUserController = () => {
    const createUserRepository = new PostgresCreateUserRepository();
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const passwordHashAdapter = new PasswordHashAdapter();
    const idGeneratorAdapter = new IdGeneratorAdapter();
    // const tokenGeneratorAdapter = new TokenGeneratorAdapter();
    // const createEmailVerificationRepository =
    //     new PostgresEmailVerificationRepository();
    // const emailAdapter = new EmailAdapter();

    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
        passwordHashAdapter,
        idGeneratorAdapter,
        // tokenGeneratorAdapter,
        // createEmailVerificationRepository,
        // emailAdapter,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    return getUserByIdController;
};
