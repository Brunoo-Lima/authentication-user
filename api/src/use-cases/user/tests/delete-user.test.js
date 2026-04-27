import { faker } from '@faker-js/faker';
import { user } from '../../../tests';
import { DeleteUserUseCase } from '../delete-user';

describe('Delete User Use Case', () => {
    class DeleteUserRepositoryStub {
        async execute() {
            return user;
        }
    }
    const makeSut = () => {
        const deleteUserRepository = new DeleteUserRepositoryStub();
        const sut = new DeleteUserUseCase(deleteUserRepository);

        return { sut, deleteUserRepository };
    };

    it('should delete a user', async () => {
        const { sut } = makeSut();

        const result = await sut.execute(user.id);

        expect(result).toEqual(user);
    });

    it('should call DeleteUserRepository with correct params', async () => {
        const { sut, deleteUserRepository } = makeSut();
        const executeSpy = jest.spyOn(deleteUserRepository, 'execute');
        const userId = faker.string.uuid();

        await sut.execute(userId);

        expect(executeSpy).toHaveBeenCalledWith(userId);
    });

    it('should throw if DeleteUserRepository throws', async () => {
        const { sut, deleteUserRepository } = makeSut();
        jest.spyOn(deleteUserRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const promise = sut.execute(faker.string.uuid());

        await expect(promise).rejects.toThrow();
    });
});
