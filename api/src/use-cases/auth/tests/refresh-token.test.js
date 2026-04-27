import { faker } from '@faker-js/faker';
import { UnauthorizedError } from '../../../errors';
import { session } from '../../../tests';
import { RefreshTokenUseCase } from '../refresh-token';

describe('Refresh Token Use Case', () => {
    const userId = faker.string.uuid();
    const sessionId = faker.string.uuid();

    class TokensGeneratorAdapterStub {
        execute() {
            return {
                accessToken: 'access_token',
                refreshToken: 'refresh_token',
            };
        }
    }

    class TokenVerifierAdapterStub {
        execute() {
            return true;
        }
    }

    class GetSessionRefreshTokenRepositoryStub {
        execute() {
            return {
                refreshToken: 'refresh_token',
            };
        }
    }

    class UpdateSessionRefreshTokenRepositoryStub {
        async execute() {
            return session;
        }
    }

    const makeSut = () => {
        const tokensGeneratorAdapter = new TokensGeneratorAdapterStub();
        const tokenVerifierAdapter = new TokenVerifierAdapterStub();
        const getSessionByRefreshTokenRepository =
            new GetSessionRefreshTokenRepositoryStub();
        const updateSessionRefreshTokenRepository =
            new UpdateSessionRefreshTokenRepositoryStub();

        const sut = new RefreshTokenUseCase(
            tokensGeneratorAdapter,
            tokenVerifierAdapter,
            getSessionByRefreshTokenRepository,
            updateSessionRefreshTokenRepository,
        );

        return {
            sut,
            tokensGeneratorAdapter,
            tokenVerifierAdapter,
            getSessionByRefreshTokenRepository,
            updateSessionRefreshTokenRepository,
        };
    };

    it('should return tokens', async () => {
        const {
            sut,
            tokenVerifierAdapter,
            getSessionByRefreshTokenRepository,
        } = makeSut();

        jest.spyOn(tokenVerifierAdapter, 'execute').mockReturnValueOnce({
            userId,
        });
        jest.spyOn(
            getSessionByRefreshTokenRepository,
            'execute',
        ).mockResolvedValueOnce({
            id: sessionId,
            user_id: userId,
            expires_at: new Date(Date.now() + 1000 * 60 * 60),
        });

        const result = await sut.execute('refresh_token');

        expect(result).toEqual({
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
        });
    });

    it('should throw if tokenVerifierAdapter returns falsy', async () => {
        const { sut, tokenVerifierAdapter } = makeSut();

        jest.spyOn(tokenVerifierAdapter, 'execute').mockReturnValueOnce(false);

        const promise = sut.execute('refresh_token');

        await expect(promise).rejects.toThrow(new UnauthorizedError());
    });

    it('should throw if session is not found', async () => {
        const {
            sut,
            tokenVerifierAdapter,
            getSessionByRefreshTokenRepository,
        } = makeSut();

        jest.spyOn(tokenVerifierAdapter, 'execute').mockReturnValueOnce({
            userId,
        });
        jest.spyOn(
            getSessionByRefreshTokenRepository,
            'execute',
        ).mockResolvedValueOnce(null);

        const promise = sut.execute('refresh_token');

        await expect(promise).rejects.toThrow(new UnauthorizedError());
    });

    it('should throw if session.user_id does not match decodedToken.userId', async () => {
        const {
            sut,
            tokenVerifierAdapter,
            getSessionByRefreshTokenRepository,
        } = makeSut();

        jest.spyOn(tokenVerifierAdapter, 'execute').mockReturnValueOnce({
            userId: 'different_user_id',
        });
        jest.spyOn(
            getSessionByRefreshTokenRepository,
            'execute',
        ).mockResolvedValueOnce({ ...session });

        const promise = sut.execute('refresh_token');

        await expect(promise).rejects.toThrow(new UnauthorizedError());
    });

    it('should throw if session is expired', async () => {
        const {
            sut,
            tokenVerifierAdapter,
            getSessionByRefreshTokenRepository,
        } = makeSut();

        jest.spyOn(tokenVerifierAdapter, 'execute').mockReturnValueOnce({
            userId,
        });
        jest.spyOn(
            getSessionByRefreshTokenRepository,
            'execute',
        ).mockResolvedValueOnce({
            id: faker.string.uuid(),
            user_id: userId,
            expires_at: new Date(Date.now() - 1000),
        });

        const promise = sut.execute('refresh_token');

        await expect(promise).rejects.toThrow(new UnauthorizedError());
    });

    it('should call updateSessionRefreshTokenRepository with correct values', async () => {
        const {
            sut,
            tokenVerifierAdapter,
            getSessionByRefreshTokenRepository,
            updateSessionRefreshTokenRepository,
        } = makeSut();

        jest.spyOn(tokenVerifierAdapter, 'execute').mockReturnValueOnce({
            userId,
        });
        jest.spyOn(
            getSessionByRefreshTokenRepository,
            'execute',
        ).mockResolvedValueOnce({
            id: sessionId,
            user_id: userId,
            expires_at: new Date(Date.now() + 1000 * 60 * 60),
        });
        const updateSpy = jest.spyOn(
            updateSessionRefreshTokenRepository,
            'execute',
        );

        await sut.execute('refresh_token');

        expect(updateSpy).toHaveBeenCalledWith(
            sessionId,
            'refresh_token',
            expect.any(Date),
        );
    });
});
