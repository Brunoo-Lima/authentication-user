import jwt from 'jsonwebtoken';
import { InvalidPasswordError, UserNotFoundError } from '../../errors';
import { IGetUserByEmailRepository } from '../../interfaces/repositories';
import { IPasswordComparatorAdapter } from '../../interfaces/adapters';

export class LoginUseCase {
    private getUserByEmailRepository: IGetUserByEmailRepository;
    private passwordComparatorAdapter: IPasswordComparatorAdapter;

    constructor(
        getUserByEmailRepository: IGetUserByEmailRepository,
        passwordComparatorAdapter: IPasswordComparatorAdapter,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.passwordComparatorAdapter = passwordComparatorAdapter;
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

        const tokens = {
            accessToken: jwt.sign(
                { userId: user.id },
                process.env.JWT_ACCESS_TOKEN_SECRET as string,
                {
                    expiresIn: '15m',
                },
            ),
            refreshToken: jwt.sign(
                { userId: user.id },
                process.env.JWT_REFRESH_TOKEN_SECRET as string,
                {
                    expiresIn: '30d',
                },
            ),
        };

        return {
            ...user,
            tokens,
        };
    }
}
