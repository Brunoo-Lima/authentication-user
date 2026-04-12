import { ICreateEmailVerificationRepository } from '../../../interfaces/repositories';
import { prisma } from '../../../lib/prisma';

export class PostgresEmailVerificationRepository implements ICreateEmailVerificationRepository {
    async execute(
        user_id: string,
        token: string,
        expires_at: Date,
    ): Promise<void> {
        await prisma.emailVerification.create({
            data: {
                user_id,
                token,
                expires_at,
            },
        });
    }
}
