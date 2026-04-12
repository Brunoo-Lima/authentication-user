// src/repositories/prisma/PrismaGetEmailVerificationByTokenRepository.ts

import { prisma } from '../../../lib/prisma';

export class PrismaGetEmailVerificationByTokenRepository {
    async execute(token: string) {
        return await prisma.emailVerification.findUnique({
            where: { token },
        });
    }
}
