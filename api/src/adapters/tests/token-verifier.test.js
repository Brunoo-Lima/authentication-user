import { TokenVerifierAdapter } from '../token-verifier';
import jwt from 'jsonwebtoken';

describe('Token Verifier Adapter', () => {
    it('should return a decoded token', async () => {
        const sut = new TokenVerifierAdapter();
        jest.spyOn(jwt, 'verify').mockReturnValueOnce({});

        const result = await sut.execute('token', 'secret');

        expect(result).toBeTruthy();
        expect(typeof result).toBe('object');
    });
});
