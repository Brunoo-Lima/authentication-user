import { CreateUserController } from '../create-user';
import { user } from '../../../tests/index';
import { EmailAlreadyInUseError } from '../../../errors';

describe('Create user controller', () => {
    class CreateUserUseCaseStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const sut = new CreateUserController(createUserUseCaseStub);

        return { sut, createUserUseCaseStub };
    };

    const baseHttpRequest = {
        body: {
            name: 'Test',
            email: 'test@test.com',
            password: '123456',
        },
    };

    it('should return 201 if create a user successfully', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(user);
    });

    it('should return 400 if name is missing', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            body: {
                email: 'test@test.com',
                password: '123456',
            },
        };

        const response = await sut.execute(httpRequest);

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if email is missing', async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                name: 'Test',
                password: '123456',
            },
        };

        const response = await sut.execute(httpRequest);

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if email is invalid', async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                name: 'Test',
                email: 'invalid_email',
                password: '123456',
            },
        };

        const response = await sut.execute(httpRequest);

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if password is missing', async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                name: 'Test',
                email: 'test@test.com',
            },
        };

        const response = await sut.execute(httpRequest);

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if password is less than 6 characters', async () => {
        const { sut } = makeSut();

        const httpRequest = {
            body: {
                name: 'Test',
                email: 'test@test.com',
                password: '123',
            },
        };

        const response = await sut.execute(httpRequest);

        expect(response.statusCode).toBe(400);
    });

    it('should return 200 and call CreateUser with correct values', async () => {
        const { sut, createUserUseCaseStub } = makeSut();
        const executeSpy = jest.spyOn(createUserUseCaseStub, 'execute');

        await sut.execute(baseHttpRequest);

        expect(executeSpy).toHaveBeenCalledWith({
            name: baseHttpRequest.body.name,
            email: baseHttpRequest.body.email,
            password: baseHttpRequest.body.password,
        });
    });

    it('should return 500 if CreateUserUseCase throws', async () => {
        const { sut, createUserUseCaseStub } = makeSut();
        jest.spyOn(createUserUseCaseStub, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(500);
    });

    it('should return 400 if CreateUserUseCase throws EmailAlreadyInUseError', async () => {
        const { sut, createUserUseCaseStub } = makeSut();
        jest.spyOn(createUserUseCaseStub, 'execute').mockRejectedValueOnce(
            new EmailAlreadyInUseError(baseHttpRequest.body.email),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(400);
    });
});
