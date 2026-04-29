import {
    EmailAlreadyVerifiedError,
    ExpiredTokenError,
    InvalidTokenError,
} from '../../../errors';
import { user } from '../../../tests';
import { VerifyEmailUseCase } from '../verify-email';

describe('Verify Email Use Case', () => {
    class GetEmailVerificationByTokenRepositoryStub {
        async execute() {
            return true;
        }
    }

    class VerifyEmailRepositoryStub {
        async execute() {
            return true;
        }
    }

    const makeSut = () => {
        const getEmailVerificationByTokenRepositoryStub =
            new GetEmailVerificationByTokenRepositoryStub();
        const verifyEmailRepositoryStub = new VerifyEmailRepositoryStub();
        const sut = new VerifyEmailUseCase(
            getEmailVerificationByTokenRepositoryStub,
            verifyEmailRepositoryStub,
        );
        return {
            sut,
            getEmailVerificationByTokenRepositoryStub,
            verifyEmailRepositoryStub,
        };
    };

    it('should call GetEmailVerificationByTokenRepository with correct params', async () => {
        const { sut, getEmailVerificationByTokenRepositoryStub } = makeSut();
        const executeSpy = jest.spyOn(
            getEmailVerificationByTokenRepositoryStub,
            'execute',
        );

        await sut.execute('any_token');

        expect(executeSpy).toHaveBeenCalledWith('any_token');
    });

    it('should call VerifyEmailRepository with correct params', async () => {
        const {
            sut,
            verifyEmailRepositoryStub,
            getEmailVerificationByTokenRepositoryStub,
        } = makeSut();
        const getEmailVerificationByTokenRepositoryStubSpy = jest
            .spyOn(getEmailVerificationByTokenRepositoryStub, 'execute')
            .mockReturnValueOnce(true);
        const verifyEmailRepositoryStubSpy = jest.spyOn(
            verifyEmailRepositoryStub,
            'execute',
        );

        await sut.execute('any_token');

        expect(
            getEmailVerificationByTokenRepositoryStubSpy,
        ).toHaveBeenCalledWith('any_token');

        expect(verifyEmailRepositoryStubSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw if GetEmailVerificationByTokenRepository throws', async () => {
        const { sut, getEmailVerificationByTokenRepositoryStub } = makeSut();
        jest.spyOn(
            getEmailVerificationByTokenRepositoryStub,
            'execute',
        ).mockRejectedValueOnce(new Error());

        const promise = sut.execute('any_token');

        await expect(promise).rejects.toThrow();
    });

    it('should throw if VerifyEmailRepository throws', async () => {
        const { sut, verifyEmailRepositoryStub } = makeSut();
        jest.spyOn(verifyEmailRepositoryStub, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const promise = sut.execute('any_token');

        await expect(promise).rejects.toThrow();
    });

    it('should throw if verification not found', async () => {
        const { sut, getEmailVerificationByTokenRepositoryStub } = makeSut();
        jest.spyOn(
            getEmailVerificationByTokenRepositoryStub,
            'execute',
        ).mockReturnValueOnce(null);

        const promise = sut.execute('any_token');

        await expect(promise).rejects.toThrow(new InvalidTokenError());
    });

    it('should throw if expires_at is in the past', async () => {
        const { sut, getEmailVerificationByTokenRepositoryStub } = makeSut();
        jest.spyOn(
            getEmailVerificationByTokenRepositoryStub,
            'execute',
        ).mockReturnValueOnce({
            expires_at: new Date(Date.now() - 1000),
        });

        const promise = sut.execute('any_token');

        await expect(promise).rejects.toThrow(new ExpiredTokenError());
    });

    it('should throw if email already verified', async () => {
        const { sut, getEmailVerificationByTokenRepositoryStub } = makeSut();
        jest.spyOn(
            getEmailVerificationByTokenRepositoryStub,
            'execute',
        ).mockReturnValueOnce({
            verified_at: true,
        });

        const promise = sut.execute('any_token');

        await expect(promise).rejects.toThrow(new EmailAlreadyVerifiedError());
    });
});
