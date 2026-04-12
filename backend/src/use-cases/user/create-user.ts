import { IUser } from '../../@types/IUser';
import { EmailAlreadyInUseError } from '../../errors';
import {
    ICreateUserRepository,
    IGetUserByEmailRepository,
} from '../../interfaces/repositories';
import {
    IIdGeneratorAdapter,
    IPasswordHashAdapter,
} from '../../interfaces/adapters';

export class CreateUserUseCase {
    private getUserByEmailRepository: IGetUserByEmailRepository;
    private createUserRepository: ICreateUserRepository;
    private passwordHashAdapter: IPasswordHashAdapter;
    private idGeneratorAdapter: IIdGeneratorAdapter;

    constructor(
        getUserByEmailRepository: IGetUserByEmailRepository,
        createUserRepository: ICreateUserRepository,
        passwordHashAdapter: IPasswordHashAdapter,
        idGeneratorAdapter: IIdGeneratorAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
        this.passwordHashAdapter = passwordHashAdapter;
        this.idGeneratorAdapter = idGeneratorAdapter;
    }

    async execute(user: IUser) {
        const userAlreadyExists = await this.getUserByEmailRepository.execute(
            user.email,
        );

        if (userAlreadyExists) {
            throw new EmailAlreadyInUseError(user.email);
        }

        const userId = this.idGeneratorAdapter.execute();

        const hashedPassword = await this.passwordHashAdapter.execute(
            user.password,
        );

        const userData = {
            ...user,
            id: userId,
            password: hashedPassword,
        };

        return await this.createUserRepository.execute(userData);
    }
}
