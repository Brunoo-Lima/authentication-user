import { TokensGeneratorAdapter } from '../tokens-generator';
import jwt from 'jsonwebtoken';

describe('Tokens Generator Adapter', () => {
    const ACCESS_SECRET = 'access_secret';
    const REFRESH_SECRET = 'refresh_secret';

    beforeAll(() => {
        process.env.JWT_ACCESS_TOKEN_SECRET = ACCESS_SECRET;
        process.env.JWT_REFRESH_TOKEN_SECRET = REFRESH_SECRET;
    });

    it('should return tokens', async () => {
        const sut = new TokensGeneratorAdapter();

        jest.spyOn(jwt, 'sign').mockReturnValueOnce('any_token');

        const result = await sut.execute('any_user_id');

        expect(result).toBeTruthy();
        expect(typeof result).toBe('object');
        expect(result.accessToken).toBe('any_token');
    });
});
