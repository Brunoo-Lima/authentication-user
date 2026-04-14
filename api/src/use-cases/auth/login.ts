import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { InvalidPasswordError, UserNotFoundError } from '../../errors';
import { IGetUserByEmailRepository } from '../../interfaces/repositories';

export class LoginUseCase {
    private getUserByEmailRepository: IGetUserByEmailRepository;

    constructor(getUserByEmailRepository: IGetUserByEmailRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
    }

    async execute(email: string, password: string) {
        const user = await this.getUserByEmailRepository.execute(email);

        if (!user) {
            throw new UserNotFoundError();
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            throw new InvalidPasswordError();
        }

        console.log('chegou aqui', user);

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
