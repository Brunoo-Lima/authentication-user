import { prisma } from '../../../lib/prisma';

export class PostgresGetUserByEmailRepository {
    async execute(email: string) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                email_verified: true,
                is_active: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
}
