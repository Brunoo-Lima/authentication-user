import { prisma } from '../../../lib/prisma';

export class PostgresGetPasswordResetByTokenRepository {
    async execute(token: string) {
        return await prisma.passwordReset.findUnique({
            where: { token },
        });
    }
}
