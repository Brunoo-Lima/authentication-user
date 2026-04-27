import { faker } from '@faker-js/faker';
import { user } from '../../../tests';
import { UpdateUserUseCase } from '../update-user';
import { EmailAlreadyInUseError } from '../../../errors';

describe('Update User Use Case', () => {
    class UpdateUserRepositoryStub {
        async execute() {
            return user;
        }
    }

    class GetUserByEmailRepositoryStub {
        async execute() {
            return null;
        }
    }

    class PasswordHashAdapterStub {
        async execute() {
            return 'hashed_password';
        }
    }

    const makeSut = () => {
        const updateUserRepository = new UpdateUserRepositoryStub();
        const getUserByEmailRepository = new GetUserByEmailRepositoryStub();
        const passwordHashAdapter = new PasswordHashAdapterStub();
        const sut = new UpdateUserUseCase(
            updateUserRepository,
            getUserByEmailRepository,
            passwordHashAdapter,
        );

        return {
            sut,
            updateUserRepository,
            getUserByEmailRepository,
            passwordHashAdapter,
        };
    };

    it('should update user successfully (without password and email)', async () => {
        const { sut } = makeSut();

        const result = await sut.execute(faker.string.uuid(), {
            name: faker.person.fullName(),
        });

        expect(result).toEqual(user);
    });

    it('should update user successfully (with email)', async () => {
        const { sut, getUserByEmailRepository } = makeSut();
        const getUserByEmailRepositorySpy = jest.spyOn(
            getUserByEmailRepository,
            'execute',
        );

        const email = faker.internet.email();

        const result = await sut.execute(faker.string.uuid(), {
            email,
        });

        expect(getUserByEmailRepositorySpy).toHaveBeenCalledWith(email);
        expect(result).toBe(user);
    });

    it('should update user successfully (with password)', async () => {
        const { sut, passwordHashAdapter } = makeSut();
        const passwordHashAdapterSpy = jest.spyOn(
            passwordHashAdapter,
            'execute',
        );

        const password = faker.internet.password();

        const result = await sut.execute(faker.string.uuid(), {
            password,
        });

        expect(passwordHashAdapterSpy).toHaveBeenCalledWith(password);
        expect(result).toBe(user);
    });

    it('should call UpdateUserRepository with correct params', async () => {
        const { sut, updateUserRepository } = makeSut();
        const updateUserRepositorySpy = jest.spyOn(
            updateUserRepository,
            'execute',
        );

        const updateUserParams = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        };

        await sut.execute(user.id, updateUserParams);

        expect(updateUserRepositorySpy).toHaveBeenCalledWith(user.id, {
            name: updateUserParams.name,
            email: updateUserParams.email,
            password: 'hashed_password',
        });
    });

    it('should throw EmailAlreadyInUseError if email is already in use', async () => {
        const { sut, getUserByEmailRepository } = makeSut();
        jest.spyOn(getUserByEmailRepository, 'execute').mockResolvedValueOnce(
            user,
        );

        const promise = sut.execute(faker.string.uuid(), {
            email: user.email,
        });

        await expect(promise).rejects.toThrow(
            new EmailAlreadyInUseError(user.email),
        );
    });

    it('should throw if GetUserByEmailRepository throws', async () => {
        const { sut, getUserByEmailRepository } = makeSut();
        jest.spyOn(getUserByEmailRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const promise = sut.execute(faker.string.uuid(), {
            email: user.email,
        });

        await expect(promise).rejects.toThrow();
    });

    it('should throw if PasswordHashAdapter throws', async () => {
        const { sut, passwordHashAdapter } = makeSut();
        jest.spyOn(passwordHashAdapter, 'execute').mockImplementationOnce(
            () => {
                throw new Error();
            },
        );

        const promise = sut.execute(faker.string.uuid(), {
            password: user.password,
        });

        await expect(promise).rejects.toThrow();
    });

    it('should throw if UpdateUserRepository throws', async () => {
        const { sut, updateUserRepository } = makeSut();
        jest.spyOn(updateUserRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const promise = sut.execute(faker.string.uuid(), user);

        await expect(promise).rejects.toThrow();
    });
});
