import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { prisma } from '../../../lib/prisma';
import { UserNotFoundError } from '../../../errors';

export class PostgresDeleteUserRepository {
    async execute(userId: string) {
        try {
            return await prisma.user.delete({
                where: {
                    id: userId,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // P2025 = An operation failed because it depends on one or more records that were required but not found. {cause}
                if (error.code === 'P2025') {
                    throw new UserNotFoundError(userId);
                }
            }

            throw error;
        }
    }
}
