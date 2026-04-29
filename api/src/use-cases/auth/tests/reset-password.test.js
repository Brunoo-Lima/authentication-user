import { ExpiredTokenError, InvalidTokenError } from '../../../errors';
import { user } from '../../../tests';
import { ResetPasswordUseCase } from '../reset-password';

describe('Reset Password Use Case', () => {
    class GetPasswordResetByTokenRepositoryStub {
        async execute() {
            return {
                token: 'valid_token',
            };
        }
    }

    class PasswordHashAdapterStub {
        async execute() {
            return 'hashed_password';
        }
    }

    class UpdateUserRepositoryStub {
        async execute() {
            return user;
        }
    }

    class MarkPasswordResetAsUsedRepositoryStub {
        async execute() {
            return user;
        }
    }

    const makeSut = () => {
        const getPasswordResetByTokenRepository =
            new GetPasswordResetByTokenRepositoryStub();
        const passwordHashAdapter = new PasswordHashAdapterStub();
        const updateUserRepository = new UpdateUserRepositoryStub();
        const markPasswordResetAsUsedRepository =
            new MarkPasswordResetAsUsedRepositoryStub();
        const sut = new ResetPasswordUseCase(
            getPasswordResetByTokenRepository,
            passwordHashAdapter,
            updateUserRepository,
            markPasswordResetAsUsedRepository,
        );

        return {
            sut,
            getPasswordResetByTokenRepository,
            passwordHashAdapter,
            updateUserRepository,
            markPasswordResetAsUsedRepository,
        };
    };

    it('should throw if GetPasswordResetByTokenRepository throws', async () => {
        const { sut, getPasswordResetByTokenRepository } = makeSut();
        jest.spyOn(
            getPasswordResetByTokenRepository,
            'execute',
        ).mockRejectedValueOnce(new Error());

        const promise = sut.execute('any_token', 'any_password');

        await expect(promise).rejects.toThrow();
    });

    it('should throw if PasswordHashAdapter throws', async () => {
        const { sut, passwordHashAdapter } = makeSut();
        jest.spyOn(passwordHashAdapter, 'execute').mockImplementationOnce(
            () => {
                throw new Error();
            },
        );

        const promise = sut.execute('any_token', 'any_password');

        await expect(promise).rejects.toThrow();
    });

    it('should throw if UpdateUserRepository throws', async () => {
        const { sut, updateUserRepository } = makeSut();
        jest.spyOn(updateUserRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const promise = sut.execute('any_token', 'any_password');

        await expect(promise).rejects.toThrow();
    });

    it('should throw if MarkPasswordResetAsUsedRepository throws', async () => {
        const { sut, markPasswordResetAsUsedRepository } = makeSut();
        jest.spyOn(
            markPasswordResetAsUsedRepository,
            'execute',
        ).mockRejectedValueOnce(new Error());

        const promise = sut.execute('any_token', 'any_password');

        await expect(promise).rejects.toThrow();
    });

    it('should call GetPasswordResetByTokenRepository with correct params', async () => {
        const { sut, getPasswordResetByTokenRepository } = makeSut();
        const executeSpy = jest.spyOn(
            getPasswordResetByTokenRepository,
            'execute',
        );

        await sut.execute('any_token', 'any_password');

        expect(executeSpy).toHaveBeenCalledWith('any_token');
    });

    it('should call PasswordHashAdapter with correct params', async () => {
        const { sut, passwordHashAdapter } = makeSut();
        const executeSpy = jest.spyOn(passwordHashAdapter, 'execute');

        await sut.execute('any_token', 'any_password');

        expect(executeSpy).toHaveBeenCalledWith('any_password');
    });

    it('should call UpdateUserRepository with correct params', async () => {
        const { sut, updateUserRepository, getPasswordResetByTokenRepository } =
            makeSut();
        const getPasswordResetByTokenRepositorySpy = jest
            .spyOn(getPasswordResetByTokenRepository, 'execute')
            .mockReturnValueOnce({
                user_id: user.id,
            });
        const executeSpy = jest.spyOn(updateUserRepository, 'execute');

        await sut.execute('any_token', 'any_password');

        expect(getPasswordResetByTokenRepositorySpy).toHaveBeenCalledWith(
            'any_token',
        );
        expect(executeSpy).toHaveBeenCalledWith(user.id, {
            password: 'hashed_password',
        });
    });

    it('should call MarkPasswordResetAsUsedRepository with correct params', async () => {
        const { sut, markPasswordResetAsUsedRepository } = makeSut();
        const executeSpy = jest.spyOn(
            markPasswordResetAsUsedRepository,
            'execute',
        );

        await sut.execute('any_token', 'any_password');

        expect(executeSpy).toHaveBeenCalledWith('any_token');
    });

    it('should return InvalidTokenError if invalid token or already used', async () => {
        const { sut, getPasswordResetByTokenRepository } = makeSut();
        jest.spyOn(
            getPasswordResetByTokenRepository,
            'execute',
        ).mockReturnValueOnce(null);

        const promise = sut.execute('any_token', 'any_password');

        await expect(promise).rejects.toThrow(new InvalidTokenError());
    });

    it('should return ExpiredTokenError if expired token', async () => {
        const { sut, getPasswordResetByTokenRepository } = makeSut();
        jest.spyOn(
            getPasswordResetByTokenRepository,
            'execute',
        ).mockReturnValueOnce({
            expires_at: new Date(Date.now() - 1000),
        });

        const promise = sut.execute('any_token', 'any_password');

        await expect(promise).rejects.toThrow(new ExpiredTokenError());
    });
});
