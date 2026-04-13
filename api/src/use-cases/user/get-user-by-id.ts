import { IGetUserByIdRepository } from '../../interfaces/repositories';

export class GetUserByIdUseCase {
    private getUserByIdRepository: IGetUserByIdRepository;

    constructor(getUserByIdRepository: IGetUserByIdRepository) {
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(userId: string) {
        return await this.getUserByIdRepository.execute(userId);
    }
}
