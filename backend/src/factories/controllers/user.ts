import {
    EmailAdapter,
    IdGeneratorAdapter,
    PasswordHashAdapter,
    TokenGeneratorAdapter,
} from '../../adapters';
import { CreateUserController } from '../../controllers';
import {
    PostgresCreateUserRepository,
    PostgresEmailVerificationRepository,
    PostgresGetUserByEmailRepository,
} from '../../repositories/postgres';
import { CreateUserUseCase } from '../../use-cases';

export const makeCreateUserController = () => {
    const createUserRepository = new PostgresCreateUserRepository();
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const passwordHashAdapter = new PasswordHashAdapter();
    const idGeneratorAdapter = new IdGeneratorAdapter();
    const tokenGeneratorAdapter = new TokenGeneratorAdapter();
    const createEmailVerificationRepository =
        new PostgresEmailVerificationRepository();
    const emailAdapter = new EmailAdapter();

    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository,
        passwordHashAdapter,
        idGeneratorAdapter,
        tokenGeneratorAdapter,
        createEmailVerificationRepository,
        emailAdapter,
    );

    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};
