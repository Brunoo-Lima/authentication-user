import { IUpdateUser } from '../../@types/IUser';
import { EmailAlreadyInUseError } from '../../errors';
import { IPasswordHashAdapter } from '../../interfaces/adapters';
import {
    IGetUserByEmailRepository,
    IUpdateUserRepository,
} from '../../interfaces/repositories';

export class UpdateUserUseCase {
    private updateUserRepository: IUpdateUserRepository;
    private getUserByEmailRepository: IGetUserByEmailRepository;
    private passwordHashAdapter: IPasswordHashAdapter;

    constructor(
        updateUserRepository: IUpdateUserRepository,
        getUserByEmailRepository: IGetUserByEmailRepository,
        passwordHashAdapter: IPasswordHashAdapter,
    ) {
        this.updateUserRepository = updateUserRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.passwordHashAdapter = passwordHashAdapter;
    }

    async execute(userId: string, updateUserParams: IUpdateUser) {
        if (updateUserParams.email) {
            const userAlreadyExists =
                await this.getUserByEmailRepository.execute(
                    updateUserParams.email,
                );

            if (userAlreadyExists && userAlreadyExists.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }
        }

        const user = { ...updateUserParams };

        if (updateUserParams.password) {
            const hashedPassword = await this.passwordHashAdapter.execute(
                updateUserParams.password,
            );

            user.password = hashedPassword;
        }

        const updateUser = await this.updateUserRepository.execute(
            userId,
            user,
        );

        return updateUser;
    }
}
