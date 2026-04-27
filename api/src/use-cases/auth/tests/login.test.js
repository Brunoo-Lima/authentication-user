import {
    EmailNotVerifiedError,
    InvalidPasswordError,
    UserNotFoundError,
} from '../../../errors';
import { session, user, userVerified } from '../../../tests';
import { LoginUseCase } from '../login';

describe('Login Use Case', () => {
    class GetUserByEmailRepositoryStub {
        async execute() {
            return null;
        }
    }

    class PasswordComparatorAdapterStub {
        async execute() {
            return true;
        }
    }

    class TokensGeneratorAdapterStub {
        async execute() {
            return {
                accessToken: 'any_access_token',
                refreshToken: 'any_refresh_token',
            };
        }
    }

    class RegisterSessionRepositoryStub {
        async execute() {
            return session;
        }
    }

    const makeSut = () => {
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub();
        const passwordComparatorAdapter = new PasswordComparatorAdapterStub();
        const tokensGeneratorAdapter = new TokensGeneratorAdapterStub();
        const registerSessionRepository = new RegisterSessionRepositoryStub();

        const sut = new LoginUseCase(
            getUserByEmailRepository,
            passwordComparatorAdapter,
            tokensGeneratorAdapter,
            registerSessionRepository,
        );

        return {
            sut,
            getUserByEmailRepository,
            passwordComparatorAdapter,
            tokensGeneratorAdapter,
            registerSessionRepository,
        };
    };

    it('should throw UserNotFoundError if user does not exist', async () => {
        const { sut, getUserByEmailRepository } = makeSut();
        jest.spyOn(getUserByEmailRepository, 'execute').mockResolvedValueOnce(
            null,
        );

        const promise = sut.execute('any_email', 'any_password', {
            user_agent: 'user-agent',
            ip_address: 'ip-address',
        });

        await expect(promise).rejects.toThrow(new UserNotFoundError());
    });

    it('should return EmailNotVerifiedError if email_verified is not verified', async () => {
        const { sut, getUserByEmailRepository } = makeSut();
        jest.spyOn(getUserByEmailRepository, 'execute').mockResolvedValueOnce({
            ...user,
            email_verified: false,
        });

        const promise = sut.execute('any_email', 'any_password', {
            user_agent: 'user-agent',
            ip_address: 'ip-address',
        });

        await expect(promise).rejects.toThrow(new EmailNotVerifiedError());
    });

    it('should throw if InvalidPasswordError if password is invalid', async () => {
        const { sut, passwordComparatorAdapter, getUserByEmailRepository } =
            makeSut();
        jest.spyOn(getUserByEmailRepository, 'execute').mockResolvedValueOnce({
            ...user,
            email_verified: true,
        });
        jest.spyOn(passwordComparatorAdapter, 'execute').mockReturnValue(false);

        const promise = sut.execute('any_email', 'any_password', {
            user_agent: 'user-agent',
            ip_address: 'ip-address',
        });

        await expect(promise).rejects.toThrow(new InvalidPasswordError());
    });

    it('should return user with tokens', async () => {
        const { sut, getUserByEmailRepository, tokensGeneratorAdapter } =
            makeSut();
        jest.spyOn(getUserByEmailRepository, 'execute').mockResolvedValueOnce({
            ...userVerified,
            email_verified: true,
        });

        jest.spyOn(tokensGeneratorAdapter, 'execute').mockImplementationOnce(
            () => {
                return {
                    accessToken: 'any_access_token',
                    refreshToken: 'any_refresh_token',
                };
            },
        );

        const result = await sut.execute('any_email', 'any_password', {
            user_agent: 'user-agent',
            ip_address: 'ip-address',
        });

        expect(result.tokens.accessToken).toBeDefined();
    });

    it('should call RegisterSessionRepository with correct params', async () => {
        const {
            sut,
            getUserByEmailRepository,
            tokensGeneratorAdapter,
            registerSessionRepository,
        } = makeSut();
        const executeSpy = jest.spyOn(registerSessionRepository, 'execute');
        jest.spyOn(getUserByEmailRepository, 'execute').mockResolvedValueOnce({
            ...userVerified,
            email_verified: true,
        });
        const tokens = {
            accessToken: 'any_access_token',
            refreshToken: 'any_refresh_token',
        };
        jest.spyOn(tokensGeneratorAdapter, 'execute').mockReturnValue(tokens);

        await sut.execute('any_email', 'any_password', {
            user_agent: 'user-agent',
            ip_address: 'ip-address',
        });

        expect(executeSpy).toHaveBeenCalledWith({
            user_id: userVerified.id,
            refresh_token: tokens.refreshToken,
            user_agent: 'user-agent',
            ip_address: 'ip-address',
        });
    });

    it('should throw if RegisterSessionRepository throws', async () => {
        const { sut, getUserByEmailRepository, registerSessionRepository } =
            makeSut();
        jest.spyOn(getUserByEmailRepository, 'execute').mockResolvedValueOnce({
            ...userVerified,
            email_verified: true,
        });
        jest.spyOn(registerSessionRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const promise = sut.execute('any_email', 'any_password', {
            user_agent: 'user-agent',
            ip_address: 'ip-address',
        });

        await expect(promise).rejects.toThrow();
    });
});
