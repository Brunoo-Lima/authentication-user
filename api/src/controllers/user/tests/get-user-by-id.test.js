import { faker } from '@faker-js/faker';
import { user } from '../../../tests';
import { GetUserByIdController } from '../get-user-by-id';
import { UserNotFoundError } from '../../../errors';

describe('Get user by id controller', () => {
    class GetUserByIdUseCaseStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const getUserByIdUseCaseStub = new GetUserByIdUseCaseStub();
        const sut = new GetUserByIdController(getUserByIdUseCaseStub);

        return { sut, getUserByIdUseCaseStub };
    };

    const baseHttpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    };

    it('should return 200 when user is found', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(user);
    });

    it('should return 400 when id is invalid', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            params: {
                userId: 'invalid_id',
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 404 when user is not found', async () => {
        const { sut, getUserByIdUseCaseStub } = makeSut();

        jest.spyOn(getUserByIdUseCaseStub, 'execute').mockRejectedValueOnce(
            new UserNotFoundError(baseHttpRequest.params.userId),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(404);
    });

    it('should return 500 if GetUserByIdUseCase throws', async () => {
        const { sut, getUserByIdUseCaseStub } = makeSut();

        jest.spyOn(getUserByIdUseCaseStub, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(500);
    });
});
