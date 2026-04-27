import { ForgotPasswordUseCase } from '../forgot-password';
import { faker } from '@faker-js/faker';

describe('Forgot Password Use Case', () => {
    class ForgotPasswordRepositoryStub {
        async execute() {
            return true;
        }
    }

    class GetUserByEmailRepositoryStub {
        async execute() {
            return null;
        }
    }

    class TokensEmailGeneratorAdapterStub {
        execute() {
            return 'generated_token';
        }
    }

    class EmailAdapterStub {
        async sendPasswordResetEmail() {
            return true;
        }
    }

    const makeSut = () => {
        const forgotPasswordRepositoryStub = new ForgotPasswordRepositoryStub();
        const getUserByEmailRepositoryStub = new GetUserByEmailRepositoryStub();
        const tokensEmailGeneratorAdapterStub =
            new TokensEmailGeneratorAdapterStub();
        const emailAdapterStub = new EmailAdapterStub();

        const sut = new ForgotPasswordUseCase(
            forgotPasswordRepositoryStub,
            getUserByEmailRepositoryStub,
            tokensEmailGeneratorAdapterStub,
            emailAdapterStub,
        );

        return {
            sut,
            forgotPasswordRepositoryStub,
            getUserByEmailRepositoryStub,
            tokensEmailGeneratorAdapterStub,
            emailAdapterStub,
        };
    };

    it('should call ForgotPasswordRepository with correct params', async () => {
        const {
            sut,
            forgotPasswordRepositoryStub,
            getUserByEmailRepositoryStub,
            tokensEmailGeneratorAdapterStub,
        } = makeSut();

        const fixedNow = new Date('2026-04-27T19:00:01.729Z').getTime();
        jest.spyOn(Date, 'now').mockReturnValue(fixedNow);

        const forgotParams = {
            user_id: faker.string.uuid(),
            token: faker.string.uuid(),
            expires_at: new Date(fixedNow + 1000 * 60 * 5),
        };

        jest.spyOn(getUserByEmailRepositoryStub, 'execute').mockReturnValue({
            id: forgotParams.user_id,
        });

        jest.spyOn(tokensEmailGeneratorAdapterStub, 'execute').mockReturnValue(
            forgotParams.token,
        );

        const forgotPasswordSpy = jest.spyOn(
            forgotPasswordRepositoryStub,
            'execute',
        );

        await sut.execute('user@email.com');

        expect(forgotPasswordSpy).toHaveBeenCalledWith(forgotParams);
    });

    it('should throw if ForgotPasswordRepository throws', async () => {
        const {
            sut,
            forgotPasswordRepositoryStub,
            getUserByEmailRepositoryStub,
            tokensEmailGeneratorAdapterStub,
        } = makeSut();

        jest.spyOn(getUserByEmailRepositoryStub, 'execute').mockReturnValue({
            id: faker.string.uuid(),
        });

        jest.spyOn(tokensEmailGeneratorAdapterStub, 'execute').mockReturnValue(
            faker.string.uuid(),
        );

        jest.spyOn(
            forgotPasswordRepositoryStub,
            'execute',
        ).mockRejectedValueOnce(new Error());

        const promise = sut.execute('user@email.com');

        await expect(promise).rejects.toThrow();
    });

    it('should call EmailAdapter with correct params', async () => {
        const {
            sut,
            emailAdapterStub,
            getUserByEmailRepositoryStub,
            tokensEmailGeneratorAdapterStub,
        } = makeSut();
        const fixedNow = new Date('2026-04-27T19:00:01.729Z').getTime();
        jest.spyOn(Date, 'now').mockReturnValue(fixedNow);

        const userEmail = faker.internet.email();
        const token = faker.string.uuid();

        jest.spyOn(getUserByEmailRepositoryStub, 'execute').mockReturnValue(
            Promise.resolve({
                id: faker.string.uuid(),
                email: userEmail,
            }),
        );

        jest.spyOn(tokensEmailGeneratorAdapterStub, 'execute').mockReturnValue(
            token,
        );

        const emailAdapterSpy = jest.spyOn(
            emailAdapterStub,
            'sendPasswordResetEmail',
        );

        await sut.execute(userEmail);

        expect(emailAdapterSpy).toHaveBeenCalledWith(userEmail, token);
    });

    it('should throw if EmailAdapter throws', async () => {
        const {
            sut,
            emailAdapterStub,
            getUserByEmailRepositoryStub,
            tokensEmailGeneratorAdapterStub,
        } = makeSut();

        jest.spyOn(getUserByEmailRepositoryStub, 'execute').mockReturnValue({
            id: faker.string.uuid(),
        });

        jest.spyOn(tokensEmailGeneratorAdapterStub, 'execute').mockReturnValue(
            faker.string.uuid(),
        );

        jest.spyOn(
            emailAdapterStub,
            'sendPasswordResetEmail',
        ).mockRejectedValueOnce(new Error());

        const promise = sut.execute('user@email.com');

        await expect(promise).rejects.toThrow();
    });

    it('should return early if user is not found', async () => {
        const {
            sut,
            getUserByEmailRepositoryStub,
            emailAdapterStub,
            forgotPasswordRepositoryStub,
        } = makeSut();

        jest.spyOn(getUserByEmailRepositoryStub, 'execute').mockResolvedValue(
            null,
        );

        const emailAdapterSpy = jest.spyOn(
            emailAdapterStub,
            'sendPasswordResetEmail',
        );
        const forgotPasswordSpy = jest.spyOn(
            forgotPasswordRepositoryStub,
            'execute',
        );

        await sut.execute('user@email.com');

        expect(emailAdapterSpy).not.toHaveBeenCalled();
        expect(forgotPasswordSpy).not.toHaveBeenCalled();
    });
});
