import prisma from '../../../lib/prisma';

export class PostgresUpdateSessionRefreshTokenRepository {
    async execute(sessionId: string, refreshToken: string, expiresAt: Date) {
        await prisma.session.update({
            where: {
                id: sessionId,
            },
            data: {
                refresh_token: refreshToken,
                expires_at: expiresAt,
            },
        });
    }
}
