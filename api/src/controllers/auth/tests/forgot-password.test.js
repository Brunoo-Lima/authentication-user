import { ForgotPasswordController } from '../forgot-password';

describe('Forgot Password Controller', () => {
    class ForgotPasswordUseCaseStub {
        async execute() {
            return true;
        }
    }

    const makeSut = () => {
        const forgotPasswordUseCaseStub = new ForgotPasswordUseCaseStub();
        const sut = new ForgotPasswordController(forgotPasswordUseCaseStub);

        return { sut, forgotPasswordUseCaseStub };
    };

    const baseHttpRequest = {
        body: {
            email: 'test@test.com',
        },
    };

    it('should return 200 on forgot password success', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(200);
    });

    it('should return 400 if email is missing', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            body: {
                email: undefined,
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if email is invalid', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            body: {
                email: 'invalid-email',
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 500 if ForgotPasswordUseCase throws', async () => {
        const { sut, forgotPasswordUseCaseStub } = makeSut();
        jest.spyOn(forgotPasswordUseCaseStub, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(500);
    });
});
