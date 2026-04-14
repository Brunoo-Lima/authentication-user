import { InvalidPasswordError, UserNotFoundError } from '../../errors';
import { IGetUserByEmailRepository } from '../../interfaces/repositories';
import {
    IPasswordComparatorAdapter,
    ITokensGeneratorAdapter,
} from '../../interfaces/adapters';

export class LoginUseCase {
    private getUserByEmailRepository: IGetUserByEmailRepository;
    private passwordComparatorAdapter: IPasswordComparatorAdapter;
    private tokensGeneratorAdapter: ITokensGeneratorAdapter;

    constructor(
        getUserByEmailRepository: IGetUserByEmailRepository,
        passwordComparatorAdapter: IPasswordComparatorAdapter,
        tokensGeneratorAdapter: ITokensGeneratorAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.passwordComparatorAdapter = passwordComparatorAdapter;
        this.tokensGeneratorAdapter = tokensGeneratorAdapter;
    }

    async execute(email: string, password: string) {
        const user = await this.getUserByEmailRepository.execute(email);

        if (!user) {
            throw new UserNotFoundError();
        }

        const isValidPassword = await this.passwordComparatorAdapter.execute(
            password,
            user.password,
        );

        if (!isValidPassword) {
            throw new InvalidPasswordError();
        }

        const tokens = this.tokensGeneratorAdapter.execute(user.id);

        return { ...user, tokens };
    }
}
