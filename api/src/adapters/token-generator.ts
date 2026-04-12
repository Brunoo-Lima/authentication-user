import { randomBytes } from 'crypto';

export class TokenGeneratorAdapter {
    execute(): string {
        return randomBytes(32).toString('hex');
    }
}
