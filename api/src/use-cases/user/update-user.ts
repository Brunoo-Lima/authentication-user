import { IUpdateUser } from '../../@types/IUser';
import { IPasswordHashAdapter } from '../../interfaces/adapters';
import { IUpdateUserRepository } from '../../interfaces/repositories';

export class UpdateUserUseCase {
    private updateUserRepository: IUpdateUserRepository;
    private passwordHashAdapter: IPasswordHashAdapter;

    constructor(
        updateUserRepository: IUpdateUserRepository,
        passwordHashAdapter: IPasswordHashAdapter,
    ) {
        this.updateUserRepository = updateUserRepository;
        this.passwordHashAdapter = passwordHashAdapter;
    }

    async execute(userId: string, updateUserParams: IUpdateUser) {
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
