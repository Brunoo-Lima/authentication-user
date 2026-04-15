import { ISession } from '../../../@types/ISession';
import { prisma } from '../../../lib/prisma';

export class PostgresRegisterSessionRepository {
    async execute(session: ISession) {
        return await prisma.session.create({
            data: {
                ...session,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days,
            },
        });
    }
}
