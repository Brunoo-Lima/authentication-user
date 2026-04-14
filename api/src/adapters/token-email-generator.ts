import { randomBytes } from 'crypto';

export class TokenEmailGeneratorAdapter {
    execute(): string {
        return randomBytes(32).toString('hex');
    }
}
