import { prisma } from '../../../lib/prisma';

export class PostgresGetEmailVerificationByTokenRepository {
    async execute(token: string) {
        return await prisma.emailVerification.findUnique({
            where: { token },
        });
    }
}
