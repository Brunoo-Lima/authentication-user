import { TokenEmailGeneratorAdapter } from '../token-email-generator';

describe('Token Email Generator Adapter', () => {
    it('should return a random token', async () => {
        const sut = new TokenEmailGeneratorAdapter();

        const result = await sut.execute();

        expect(result).toBeTruthy();
        expect(typeof result).toBe('string');
    });
});
