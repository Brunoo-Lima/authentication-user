import { IUpdateUser } from '../../@types/IUser';
import { UserNotFoundError } from '../../errors';
import {
    IGetUserByIdRepository,
    IUpdateUserRepository,
} from '../../interfaces/repositories';

export class UpdateUserUseCase {
    private updateUserRepository: IUpdateUserRepository;
    private getUserByIdRepository: IGetUserByIdRepository;

    constructor(
        updateUserRepository: IUpdateUserRepository,
        getUserByIdRepository: IGetUserByIdRepository,
    ) {
        this.updateUserRepository = updateUserRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(userId: string, updateUserParams: IUpdateUser) {
        const user = await this.getUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError(userId);
        }

        return await this.updateUserRepository.execute(
            userId,
            updateUserParams,
        );
    }
}
