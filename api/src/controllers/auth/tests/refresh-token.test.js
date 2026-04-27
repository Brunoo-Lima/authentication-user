import { UnauthorizedError } from '../../../errors';
import { RefreshTokenController } from '../refresh-token';

describe('Refresh Token Controller', () => {
    class RefreshTokenUseCaseStub {
        async execute() {
            return {
                accessToken: 'access_token',
                refreshToken: 'refresh_token',
            };
        }
    }

    const makeSut = () => {
        const refreshTokenUseCaseStub = new RefreshTokenUseCaseStub();
        const sut = new RefreshTokenController(refreshTokenUseCaseStub);

        return { sut, refreshTokenUseCaseStub };
    };

    const baseHttpRequest = {
        body: {
            refreshToken: 'valid_refresh_token',
        },
    };

    it('should return 200 on refresh token success', async () => {
        const { sut } = makeSut();

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
        });
    });

    it('should return 400 if refresh token is missing', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            body: {
                refreshToken: undefined,
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 400 if refresh token is invalid', async () => {
        const { sut } = makeSut();

        const response = await sut.execute({
            body: {
                refreshToken: 123,
            },
        });

        expect(response.statusCode).toBe(400);
    });

    it('should return 401 if refresh token is expired', async () => {
        const { sut, refreshTokenUseCaseStub } = makeSut();
        jest.spyOn(refreshTokenUseCaseStub, 'execute').mockRejectedValueOnce(
            new UnauthorizedError(),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(401);
    });

    it('should return 500 if RefreshTokenUseCase throws', async () => {
        const { sut, refreshTokenUseCaseStub } = makeSut();
        jest.spyOn(refreshTokenUseCaseStub, 'execute').mockRejectedValueOnce(
            new Error(),
        );

        const response = await sut.execute(baseHttpRequest);

        expect(response.statusCode).toBe(500);
    });
});
