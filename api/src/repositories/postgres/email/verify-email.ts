import prisma from '../../../lib/prisma';

export class PostgresVerifyEmailRepository {
    async execute(token: string, user_id: string): Promise<void> {
        await prisma.$transaction([
            prisma.emailVerification.update({
                where: {
                    token,
                },
                data: {
                    verified_at: new Date(),
                },
            }),
            prisma.user.update({
                where: {
                    id: user_id,
                },
                data: {
                    email_verified: true,
                },
            }),
        ]);
    }
}
