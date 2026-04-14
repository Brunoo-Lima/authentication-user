import { IUpdateUser } from '../../../@types/IUser';
import { prisma } from '../../../lib/prisma';

export class PostgresUpdateUserRepository {
    async execute(userId: string, updateUserParams: IUpdateUser) {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: updateUserParams,
        });
    }
}
