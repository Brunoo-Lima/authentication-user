import { prisma } from '../../../lib/prisma';

export class PostgresGetUserByIdRepository {
    async execute(userId: string) {
        return await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                email_verified: true,
                is_active: true,
                created_at: true,
                updated_at: true,
            },
        });
    }
}
