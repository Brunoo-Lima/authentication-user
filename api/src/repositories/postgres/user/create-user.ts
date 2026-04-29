import { IUser } from '../../../@types/IUser';
import prisma from '../../../lib/prisma';

export class PostgresCreateUserRepository {
    async execute(user: IUser) {
        return await prisma.user.create({
            data: user,
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
