import bcrypt from 'bcryptjs';

export class PasswordComparatorAdapter {
    async execute(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }
}
