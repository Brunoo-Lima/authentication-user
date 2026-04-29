import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { IUpdateUser } from '../../../@types/IUser';
import prisma from '../../../lib/prisma';
import { UserNotFoundError } from '../../../errors';

export class PostgresUpdateUserRepository {
    async execute(userId: string, updateUserParams: IUpdateUser) {
        try {
            return await prisma.user.update({
                where: {
                    id: userId,
                },
                data: updateUserParams,
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
