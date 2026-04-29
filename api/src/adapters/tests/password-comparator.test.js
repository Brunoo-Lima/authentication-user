import bcrypt from 'bcryptjs';
import { PasswordComparatorAdapter } from '../password-comparator';

describe('Password Comparator Adapter', () => {
    it('should return true if the password is correct', async () => {
        const sut = new PasswordComparatorAdapter();
        const plainPassword = 'any_password';
        const hashedPassword = await bcrypt.hash(plainPassword, 12);

        const result = await sut.execute(plainPassword, hashedPassword);

        expect(result).toBeTruthy();
    });

    it('should return false if the password is incorrect', async () => {
        const sut = new PasswordComparatorAdapter();
        const plainPassword = 'any_password';
        const hashedPassword = await bcrypt.hash(plainPassword, 12);

        const result = await sut.execute('wrong_password', hashedPassword);

        expect(result).toBeFalsy();
    });
});
