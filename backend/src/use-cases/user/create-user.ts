import bcrypt from 'bcryptjs';
import { IUser } from '../../@types/IUser';
import { EmailAlreadyInUseError } from '../../errors';
import {
    ICreateUserRepository,
    IGetUserByEmailRepository,
} from '../../interfaces/repositories';

export class CreateUserUseCase {
    private getUserByEmailRepository: IGetUserByEmailRepository;
    private createUserRepository: ICreateUserRepository;

    constructor(
        getUserByEmailRepository: IGetUserByEmailRepository,
        createUserRepository: ICreateUserRepository,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.createUserRepository = createUserRepository;
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

        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        const userData = {
            ...user,
        };

        return await this.createUserRepository.execute(userData);
    }
}
