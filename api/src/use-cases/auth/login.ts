import {
    EmailNotVerifiedError,
    InvalidPasswordError,
    UserNotFoundError,
} from '../../errors';
import {
    IGetUserByEmailRepository,
    IRegisterSessionRepository,
} from '../../interfaces/repositories';
import {
    IPasswordComparatorAdapter,
    ITokensGeneratorAdapter,
} from '../../interfaces/adapters';

export class LoginUseCase {
    private getUserByEmailRepository: IGetUserByEmailRepository;
    private passwordComparatorAdapter: IPasswordComparatorAdapter;
    private tokensGeneratorAdapter: ITokensGeneratorAdapter;
    private registerSessionRepository: IRegisterSessionRepository;

    constructor(
        getUserByEmailRepository: IGetUserByEmailRepository,
        passwordComparatorAdapter: IPasswordComparatorAdapter,
        tokensGeneratorAdapter: ITokensGeneratorAdapter,
        registerSessionRepository: IRegisterSessionRepository,
    ) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.passwordComparatorAdapter = passwordComparatorAdapter;
        this.tokensGeneratorAdapter = tokensGeneratorAdapter;
        this.registerSessionRepository = registerSessionRepository;
    }

    async execute(
        email: string,
        password: string,
        session: {
            ip_address?: string;
            user_agent?: string;
        },
    ) {
        const user = await this.getUserByEmailRepository.execute(email);

        if (!user) {
            throw new UserNotFoundError();
        }

        const isValidPassword = await this.passwordComparatorAdapter.execute(
            password,
            user.password,
        );

        if (!isValidPassword) {
            throw new InvalidPasswordError();
        }

        if (!user.email_verified) {
            throw new EmailNotVerifiedError();
        }

        const tokens = this.tokensGeneratorAdapter.execute(user.id);

        await this.registerSessionRepository.execute({
            user_id: user.id,
            refresh_token: tokens.refreshToken,
            user_agent: session.user_agent,
            ip_address: session.ip_address,
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            email_verified: user.email_verified,
            is_active: user.is_active,
            created_at: user.created_at,
            updated_at: user.updated_at,
            tokens,
        };
    }
}
