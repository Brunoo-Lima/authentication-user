import { IUser } from '../../@types/IUser';
import { EmailAlreadyInUseError } from '../../errors';
import {
    ICreateUserRepository,
    IGetUserByEmailRepository,
} from '../../interfaces/repositories';
import { IPasswordHashAdapter } from '../../interfaces/adapters';

export class CreateUserUseCase {
    private getUserByEmailRepository: IGetUserByEmailRepository;
    private createUserRepository: ICreateUserRepository;
    private passwordHashAdapter: IPasswordHashAdapter;

    constructor(
        getUserByEmailRepository: IGetUserByEmailRepository,
        createUserRepository: ICreateUserRepository,
        passwordHashAdapter: IPasswordHashAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
        this.passwordHashAdapter = passwordHashAdapter;
    }

    async execute(user: IUser) {
        const userAlreadyExists = await this.getUserByEmailRepository.execute(
            user.email,
        );

        if (userAlreadyExists) {
            throw new EmailAlreadyInUseError(user.email);
        }

        const userId = crypto.randomUUID();
        user.id = userId;

        const hashedPassword = await this.passwordHashAdapter.execute(
            user.password,
        );

        const userData = {
            ...user,
            password: hashedPassword,
        };

        return await this.createUserRepository.execute(userData);
    }
}
