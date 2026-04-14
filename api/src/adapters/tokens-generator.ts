import jwt from 'jsonwebtoken';

export class TokensGeneratorAdapter {
    execute(userId: string) {
        return {
            accessToken: jwt.sign(
                { userId },
                process.env.JWT_ACCESS_TOKEN_SECRET as string,
                { expiresIn: '15m' },
            ),
            refreshToken: jwt.sign(
                { userId },
                process.env.JWT_REFRESH_TOKEN_SECRET as string,
                { expiresIn: '30d' },
            ),
        };
    }
}
