import { IDecodedToken } from '../../@types/IAuth';
import { UnauthorizedError } from '../../errors';
import {
    ITokensGeneratorAdapter,
    ITokenVerifierAdapter,
} from '../../interfaces/adapters';

export class RefreshTokenUseCase {
    private tokensGeneratorAdapter: ITokensGeneratorAdapter;
    private tokenVerifierAdapter: ITokenVerifierAdapter;

    constructor(
        tokensGeneratorAdapter: ITokensGeneratorAdapter,
        tokenVerifierAdapter: ITokenVerifierAdapter,
    ) {
        this.tokensGeneratorAdapter = tokensGeneratorAdapter;
        this.tokenVerifierAdapter = tokenVerifierAdapter;
    }

    async execute(refreshToken: string) {
        try {
            const decodedToken = this.tokenVerifierAdapter.execute(
                refreshToken,
                process.env.JWT_REFRESH_TOKEN_SECRET as string,
            ) as IDecodedToken;

            if (!decodedToken) {
                throw new UnauthorizedError();
            }

            return this.tokensGeneratorAdapter.execute(decodedToken.userId);
        } catch (error) {
            console.error(error);
            throw new UnauthorizedError();
        }
    }
}
