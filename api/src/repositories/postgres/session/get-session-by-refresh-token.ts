import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import prisma from '../../../lib/prisma';
import { UnauthorizedError } from '../../../errors';

export class PostgresGetSessionByRefreshTokenRepository {
    async execute(refreshToken: string) {
        try {
            return await prisma.session.findUnique({
                where: {
                    refresh_token: refreshToken,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // P2025 = An operation failed because it depends on one or more records that were required but not found. {cause}
                if (error.code === 'P2025') {
                    throw new UnauthorizedError();
                }
            }

            throw error;
        }
    }
}
