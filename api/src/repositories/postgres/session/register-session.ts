import { ISession } from '../../../@types/ISession';
import { REFRESH_TOKEN_EXPIRY_MS } from '../../../lib/auth-session-expiry';
import { prisma } from '../../../lib/prisma';

export class PostgresRegisterSessionRepository {
    async execute(session: ISession) {
        await prisma.session.create({
            data: {
                ...session,
                expires_at: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
            },
        });
    }
}
