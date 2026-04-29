import { PasswordHashAdapter } from '../password-hash';

describe('Password Hash Adapter', () => {
    it('should return a hashed password', async () => {
        const sut = new PasswordHashAdapter();

        const password = 'any_password';

        const result = await sut.execute(password);

        expect(result).toBeTruthy();
        expect(typeof result).toBe('string');
        expect(result).not.toBe(password);
    });
});
