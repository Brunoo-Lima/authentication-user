import { IDecodedToken } from '../../@types/IAuth';
import { UnauthorizedError } from '../../errors';
import {
    ITokensGeneratorAdapter,
    ITokenVerifierAdapter,
} from '../../interfaces/adapters';
import {
    IGetSessionByRefreshTokenRepository,
    IUpdateSessionRefreshTokenRepository,
} from '../../interfaces/repositories';
import { REFRESH_TOKEN_EXPIRY_MS } from '../../lib/auth-session-expiry';

export class RefreshTokenUseCase {
    private tokensGeneratorAdapter: ITokensGeneratorAdapter;
    private tokenVerifierAdapter: ITokenVerifierAdapter;
    private getSessionByRefreshTokenRepository: IGetSessionByRefreshTokenRepository;
    private updateSessionRefreshTokenRepository: IUpdateSessionRefreshTokenRepository;

    constructor(
        tokensGeneratorAdapter: ITokensGeneratorAdapter,
        tokenVerifierAdapter: ITokenVerifierAdapter,
        getSessionByRefreshTokenRepository: IGetSessionByRefreshTokenRepository,
        updateSessionRefreshTokenRepository: IUpdateSessionRefreshTokenRepository,
    ) {
        this.tokensGeneratorAdapter = tokensGeneratorAdapter;
        this.tokenVerifierAdapter = tokenVerifierAdapter;
        this.getSessionByRefreshTokenRepository =
            getSessionByRefreshTokenRepository;
        this.updateSessionRefreshTokenRepository =
            updateSessionRefreshTokenRepository;
    }

    async execute(refreshToken: string) {
        const decodedToken = this.tokenVerifierAdapter.execute(
            refreshToken,
            process.env.JWT_REFRESH_TOKEN_SECRET as string,
        ) as IDecodedToken;

        if (!decodedToken) {
            throw new UnauthorizedError();
        }

        const session =
            await this.getSessionByRefreshTokenRepository.execute(refreshToken);

        if (!session || session.user_id !== decodedToken.userId) {
            throw new UnauthorizedError();
        }

        if (session.expires_at.getTime() <= Date.now()) {
            throw new UnauthorizedError();
        }

        const tokens = this.tokensGeneratorAdapter.execute(decodedToken.userId);

        await this.updateSessionRefreshTokenRepository.execute(
            session.id,
            tokens.refreshToken,
            new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
        );

        return tokens;
    }
}
