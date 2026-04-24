import { faker } from '@faker-js/faker';
import { DeleteUserController } from '../delete-user';
import { user } from '../../../tests';
import { UserNotFoundError } from '../../../errors';

describe('Delete User Controller', () => {
    class DeleteUserUseCaseStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const deleteUserUseCaseStub = new DeleteUserUseCaseStub();
        const sut = new DeleteUserController(deleteUserUseCaseStub);

        return { sut, deleteUserUseCaseStub };
    };

    const baseHttpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    };

    it('should return 200 if user is deleted successfully', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(200);
    });

    it('should return 400 if id is invalid', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            params: {
                userId: 'invalid_id',
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 404 if user is not found', async () => {
        const { sut, deleteUserUseCaseStub } = makeSut();
        jest.spyOn(deleteUserUseCaseStub, 'execute').mockRejectedValueOnce(
            new UserNotFoundError(baseHttpRequest.params.userId),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(404);
    });

    it('should return 500 if DeleteUserUseCase throws', async () => {
        const { sut, deleteUserUseCaseStub } = makeSut();
        jest.spyOn(deleteUserUseCaseStub, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(500);
    });
});
