import { faker } from '@faker-js/faker';
import { user } from '../../../tests';
import { LoginController } from '../login';
import {
    EmailNotVerifiedError,
    InvalidPasswordError,
    UserNotFoundError,
} from '../../../errors';

describe('Login Controller', () => {
    class LoginUseCaseStub {
        async execute() {
            return {
                ...user,
                tokens: {
                    accessToken: 'any_access_token',
                    refreshToken: 'any_refresh_token',
                },
            };
        }
    }

    const makeSut = () => {
        const loginUseCaseStub = new LoginUseCaseStub();
        const sut = new LoginController(loginUseCaseStub);

        return { sut, loginUseCaseStub };
    };

    const baseHttpRequest = {
        body: {
            email: faker.internet.email(),
            password: faker.internet.password({ length: 6 }),
        },
        headers: {
            'user-agent': 'test-agent',
        },
        ip: '127.0.0.1',
    };

    it('should return 200 and tokens on success', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(200);
        expect(true).toBeTruthy();
        expect(response.body).toEqual({
            ...user,
            tokens: {
                accessToken: 'any_access_token',
                refreshToken: 'any_refresh_token',
            },
        });
    });

    it('should return 400 if email is missing', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                password: faker.internet.password({ length: 6 }),
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if email is invalid', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                email: 'invalid_email',
                password: faker.internet.password({ length: 6 }),
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if password is missing', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                email: faker.internet.email(),
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if password is less than 6 characters', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest,
            body: {
                email: faker.internet.email(),
                password: faker.internet.password({ length: 5 }),
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should handle ip as string', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest,
            ip: '127.0.0.1',
        });

        expect(response.statusCode).toBe(200);
    });

    it('should handle ip as array', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest,
            ip: ['127.0.0.1', '192.168.0.1'],
        });

        expect(response.statusCode).toBe(200);
    });

    it('should handle ip as undefined', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            ...baseHttpRequest,
            ip: undefined,
        });

        expect(response.statusCode).toBe(200);
    });

    it('should return 401 when password is invalid', async () => {
        const { sut, loginUseCaseStub } = makeSut();

        jest.spyOn(loginUseCaseStub, 'execute').mockRejectedValueOnce(
            new InvalidPasswordError(),
        );

        const response = await sut.execute(baseHttpRequest);
        expect(response.statusCode).toBe(401);
    });

    it('should return 401 when user is not found', async () => {
        const { sut, loginUseCaseStub } = makeSut();

        jest.spyOn(loginUseCaseStub, 'execute').mockRejectedValueOnce(
            new UserNotFoundError(),
        );

        const response = await sut.execute(baseHttpRequest);
        expect(response.statusCode).toBe(401);
    });

    it('should return 400 if EmailNotVerifiedError is thrown', async () => {
        const { sut, loginUseCaseStub } = makeSut();
        jest.spyOn(loginUseCaseStub, 'execute').mockRejectedValueOnce(
            new EmailNotVerifiedError(),
        );

        const response = await sut.execute(baseHttpRequest);
        expect(response.statusCode).toBe(400);
    });

    it('should return 500 if LoginUseCase throws', async () => {
        const { sut, loginUseCaseStub } = makeSut();
        jest.spyOn(loginUseCaseStub, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const response = await sut.execute(baseHttpRequest);
        expect(response.statusCode).toBe(500);
    });
});
