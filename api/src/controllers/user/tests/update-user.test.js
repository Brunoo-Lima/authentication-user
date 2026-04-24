import { faker } from '@faker-js/faker';
import { user } from '../../../tests';
import { UpdateUserController } from '../update-user';
import { EmailAlreadyInUseError, UserNotFoundError } from '../../../errors';

describe('Update User Controller', () => {
    class UpdateUserUseCaseStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const updateUserUseCaseStub = new UpdateUserUseCaseStub();
        const sut = new UpdateUserController(updateUserUseCaseStub);

        return { sut, updateUserUseCaseStub };
    };

    const baseHttpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        body: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 6 }),
        },
    };

    it('should return 200 when user is updated', async () => {
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
            body: baseHttpRequest.body,
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 200 and call UpdateUser with correct values', async () => {
        const { sut, updateUserUseCaseStub } = makeSut();
        const executeSpy = jest.spyOn(updateUserUseCaseStub, 'execute');

        await sut.execute(baseHttpRequest);

        expect(executeSpy).toHaveBeenCalledWith(baseHttpRequest.params.userId, {
            name: baseHttpRequest.body.name,
            email: baseHttpRequest.body.email,
            password: baseHttpRequest.body.password,
        });
    });

    it('should return 500 if UpdateUserUseCase throws', async () => {
        const { sut, updateUserUseCaseStub } = makeSut();

        jest.spyOn(updateUserUseCaseStub, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(500);
    });

    it('should return 400 if email is invalid', async () => {
        const { sut } = makeSut();

        const httpRequest = {
            params: baseHttpRequest.params,
            body: {
                name: 'Test',
                email: 'invalid_email',
                password: 'password',
            },
        };

        const response = await sut.execute(httpRequest);

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if password is less than 6 characters', async () => {
        const { sut } = makeSut();

        const httpRequest = {
            params: baseHttpRequest.params,
            body: {
                name: 'Test',
                email: 'test@test.com',
                password: 'pass',
            },
        };

        const response = await sut.execute(httpRequest);

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if EmailAlreadyInUseError is thrown', async () => {
        const { sut, updateUserUseCaseStub } = makeSut();

        jest.spyOn(updateUserUseCaseStub, 'execute').mockRejectedValueOnce(
            new EmailAlreadyInUseError(baseHttpRequest.body.email),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(400);
    });

    it('should return 404 if user is not found', async () => {
        const { sut, updateUserUseCaseStub } = makeSut();
        jest.spyOn(updateUserUseCaseStub, 'execute').mockRejectedValueOnce(
            new UserNotFoundError(baseHttpRequest.params.userId),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(404);
    });
});
