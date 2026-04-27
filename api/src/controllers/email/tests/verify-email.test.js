import {
    EmailAlreadyVerifiedError,
    ExpiredTokenError,
    InvalidTokenError,
} from '../../../errors';
import { VerifyEmailController } from '../verify-email';

describe('Verify Email Controller', () => {
    class VerifyEmailUseCaseStub {
        async execute() {
            return {
                token: 'valid_token',
            };
        }
    }

    const makeSut = () => {
        const verifyEmailUseCaseStub = new VerifyEmailUseCaseStub();
        const sut = new VerifyEmailController(verifyEmailUseCaseStub);

        return { sut, verifyEmailUseCaseStub };
    };

    const baseHttpRequest = {
        query: {
            token: 'valid_token',
        },
    };

    it('should return 200 on verify email success', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(200);
    });

    it('should return 400 if token is invalid', async () => {
        const { sut } = makeSut();

        const httpRequest = {
            query: {
                token: 123,
            },
        };

        const response = await sut.execute(httpRequest);

        expect(response.statusCode).toBe(400);
    });

    it('should return 500 if VerifyEmailUseCase throws', async () => {
        const { sut, verifyEmailUseCaseStub } = makeSut();
        jest.spyOn(verifyEmailUseCaseStub, 'execute').mockImplementationOnce(
            () => {
                throw new Error();
            },
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(500);
    });

    it('should return 400 if InvalidTokenError is thrown', async () => {
        const { sut, verifyEmailUseCaseStub } = makeSut();
        jest.spyOn(verifyEmailUseCaseStub, 'execute').mockImplementationOnce(
            () => {
                throw new InvalidTokenError();
            },
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if ExpiredTokenError is thrown', async () => {
        const { sut, verifyEmailUseCaseStub } = makeSut();
        jest.spyOn(verifyEmailUseCaseStub, 'execute').mockImplementationOnce(
            () => {
                throw new ExpiredTokenError();
            },
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if EmailAlreadyVerifiedError is thrown', async () => {
        const { sut, verifyEmailUseCaseStub } = makeSut();
        jest.spyOn(verifyEmailUseCaseStub, 'execute').mockImplementationOnce(
            () => {
                throw new EmailAlreadyVerifiedError();
            },
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(400);
    });
});
