import { CreateUserUseCase } from '../create-user';
import { user as fakeUser } from '../../../tests';
import { EmailAlreadyInUseError } from '../../../errors';

describe('Create User Use Case', () => {
    const user = {
        ...fakeUser,
        id: undefined,
    };

    class GetUserByEmailRepositoryStub {
        async execute() {
            return null;
        }
    }

    class CreateUserRepositoryStub {
        async execute() {
            return user;
        }
    }

    class PasswordHashAdapterStub {
        execute() {
            return 'hashed_password';
        }
    }

    class IdGeneratorAdapterStub {
        execute() {
            return 'generated_id';
        }
    }

    class TokenEmailGeneratorAdapterStub {
        execute() {
            return 'generated_token';
        }
    }

    class CreateEmailVerificationRepositoryStub {
        async execute() {
            return true;
        }
    }

    class EmailAdapterStub {
        async sendVerificationEmail() {
            return true;
        }
    }

    class TokensGeneratorAdapterStub {
        execute() {
            return {
                accessToken: 'access_token',
                refreshToken: 'refresh_token',
            };
        }
    }

    const makeSut = () => {
        const getUserByEmailRepositoryStub = new GetUserByEmailRepositoryStub();
        const createUserRepositoryStub = new CreateUserRepositoryStub();
        const passwordHashAdapterStub = new PasswordHashAdapterStub();
        const idGeneratorAdapterStub = new IdGeneratorAdapterStub();
        const tokenEmailGeneratorAdapterStub =
            new TokenEmailGeneratorAdapterStub();
        const createEmailVerificationRepositoryStub =
            new CreateEmailVerificationRepositoryStub();
        const emailAdapterStub = new EmailAdapterStub();
        const tokensGeneratorAdapterStub = new TokensGeneratorAdapterStub();

        const sut = new CreateUserUseCase(
            getUserByEmailRepositoryStub,
            createUserRepositoryStub,
            passwordHashAdapterStub,
            idGeneratorAdapterStub,
            tokenEmailGeneratorAdapterStub,
            createEmailVerificationRepositoryStub,
            emailAdapterStub,
            tokensGeneratorAdapterStub,
        );

        return {
            sut,
            getUserByEmailRepositoryStub,
            createUserRepositoryStub,
            passwordHashAdapterStub,
            idGeneratorAdapterStub,
            tokenEmailGeneratorAdapterStub,
            createEmailVerificationRepositoryStub,
            emailAdapterStub,
            tokensGeneratorAdapterStub,
        };
    };

    const baseHttpRequest = {
        ...user,
        tokens: {
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
        },
    };

    it('should create a user successfully', async () => {
        const { sut } = makeSut();

        const result = await sut.execute(baseHttpRequest);

        expect(result).toBeTruthy();
        expect(result.tokens.accessToken).toBeDefined();
        expect(result.tokens.refreshToken).toBeDefined();
    });

    it('should throw an EmailAlreadyInUseError if GetUserByEmailRepository returns a user', async () => {
        const { sut, getUserByEmailRepositoryStub } = makeSut();
        jest.spyOn(getUserByEmailRepositoryStub, 'execute').mockReturnValueOnce(
            user,
        );

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow(
            new EmailAlreadyInUseError(user.email),
        );
    });

    it('should call PasswordHashAdapter to hash the password', async () => {
        const { sut, passwordHashAdapterStub, createUserRepositoryStub } =
            makeSut();
        const passwordHashSpy = jest.spyOn(passwordHashAdapterStub, 'execute');
        const createUserRepositorySpy = jest.spyOn(
            createUserRepositoryStub,
            'execute',
        );

        await sut.execute(user);

        expect(passwordHashSpy).toHaveBeenCalledWith(user.password);
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...user,
            password: 'hashed_password',
            id: 'generated_id',
        });
    });

    it('should call IdGeneratorAdapter to generate a random id', async () => {
        const { sut, idGeneratorAdapterStub, createUserRepositoryStub } =
            makeSut();
        const idGeneratorSpy = jest.spyOn(idGeneratorAdapterStub, 'execute');
        const createUserRepositorySpy = jest.spyOn(
            createUserRepositoryStub,
            'execute',
        );

        await sut.execute(user);

        expect(idGeneratorSpy).toHaveBeenCalled();
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...user,
            password: 'hashed_password',
            id: 'generated_id',
        });
    });

    it('should call TokenEmailGeneratorAdapter to generate a random token', async () => {
        const {
            sut,
            tokenEmailGeneratorAdapterStub,
            createEmailVerificationRepositoryStub,
        } = makeSut();
        const tokenEmailGeneratorSpy = jest.spyOn(
            tokenEmailGeneratorAdapterStub,
            'execute',
        );
        const createEmailVerificationRepositorySpy = jest.spyOn(
            createEmailVerificationRepositoryStub,
            'execute',
        );

        await sut.execute(user);

        expect(tokenEmailGeneratorSpy).toHaveBeenCalled();
        expect(createEmailVerificationRepositorySpy).toHaveBeenCalledWith(
            'generated_id',
            'generated_token',
            expect.any(Date),
        );
    });

    it('should call EmailAdapter to send a verification email', async () => {
        const { sut, emailAdapterStub } = makeSut();
        const emailAdapterSpy = jest.spyOn(
            emailAdapterStub,
            'sendVerificationEmail',
        );

        await sut.execute(user);

        expect(emailAdapterSpy).toHaveBeenCalledWith(
            user.email,
            'generated_token',
        );
    });

    it('should call TokensGeneratorAdapter to generate access and refresh tokens', async () => {
        const { sut, tokensGeneratorAdapterStub } = makeSut();
        const tokensGeneratorAdapterSpy = jest.spyOn(
            tokensGeneratorAdapterStub,
            'execute',
        );
        await sut.execute(user);
        expect(tokensGeneratorAdapterSpy).toHaveBeenCalled();
    });

    it('should call CreateEmailVerificationRepository to create a new email verification', async () => {
        const { sut, createEmailVerificationRepositoryStub } = makeSut();
        const createEmailVerificationRepositorySpy = jest.spyOn(
            createEmailVerificationRepositoryStub,
            'execute',
        );
        await sut.execute(user);
        expect(createEmailVerificationRepositorySpy).toHaveBeenCalledWith(
            'generated_id',
            'generated_token',
            expect.any(Date),
        );
    });

    it('should throw if GetUserByEmailRepository throws', async () => {
        const { sut, getUserByEmailRepositoryStub } = makeSut();
        jest.spyOn(
            getUserByEmailRepositoryStub,
            'execute',
        ).mockRejectedValueOnce(new Error());

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });

    it('should throw if IdGeneratorAdapter throws', async () => {
        const { sut, idGeneratorAdapterStub } = makeSut();
        jest.spyOn(idGeneratorAdapterStub, 'execute').mockImplementationOnce(
            () => {
                throw new Error();
            },
        );

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });

    it('should throw if PasswordHashAdapter throws', async () => {
        const { sut, passwordHashAdapterStub } = makeSut();
        jest.spyOn(passwordHashAdapterStub, 'execute').mockImplementationOnce(
            () => {
                throw new Error();
            },
        );

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });

    it('should throw if TokenEmailGeneratorAdapter throws', async () => {
        const { sut, tokenEmailGeneratorAdapterStub } = makeSut();
        jest.spyOn(
            tokenEmailGeneratorAdapterStub,
            'execute',
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });

    it('should throw if CreateEmailVerificationRepository throws', async () => {
        const { sut, createEmailVerificationRepositoryStub } = makeSut();
        jest.spyOn(
            createEmailVerificationRepositoryStub,
            'execute',
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });

    it('should throw if EmailAdapter throws', async () => {
        const { sut, emailAdapterStub } = makeSut();
        jest.spyOn(
            emailAdapterStub,
            'sendVerificationEmail',
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });

    it('should throw if TokensGeneratorAdapter throws', async () => {
        const { sut, tokensGeneratorAdapterStub } = makeSut();
        jest.spyOn(
            tokensGeneratorAdapterStub,
            'execute',
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });

    it('should throw if CreateUserRepository throws', async () => {
        const { sut, createUserRepositoryStub } = makeSut();
        jest.spyOn(createUserRepositoryStub, 'execute').mockImplementationOnce(
            () => {
                throw new Error();
            },
        );

        const promise = sut.execute(user);

        await expect(promise).rejects.toThrow();
    });
});
