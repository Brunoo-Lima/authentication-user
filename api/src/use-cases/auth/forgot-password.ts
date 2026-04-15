import {
    IEmailAdapter,
    ITokenEmailGeneratorAdapter,
} from '../../interfaces/adapters';
import {
    IForgotPasswordRepository,
    IGetUserByEmailRepository,
} from '../../interfaces/repositories';

export class ForgotPasswordUseCase {
    private forgotPasswordRepository: IForgotPasswordRepository;
    private getUserByEmailRepository: IGetUserByEmailRepository;
    private tokensEmailGeneratorAdapter: ITokenEmailGeneratorAdapter;
    private emailAdapter: IEmailAdapter;

    constructor(
        forgotPasswordRepository: IForgotPasswordRepository,
        getUserByEmailRepository: IGetUserByEmailRepository,
        tokensEmailGeneratorAdapter: ITokenEmailGeneratorAdapter,
        emailAdapter: IEmailAdapter,
    ) {
        this.forgotPasswordRepository = forgotPasswordRepository;
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.tokensEmailGeneratorAdapter = tokensEmailGeneratorAdapter;
        this.emailAdapter = emailAdapter;
    }

    async execute(email: string) {
        const user = await this.getUserByEmailRepository.execute(email);

        if (!user) {
            return;
        }

        const token = this.tokensEmailGeneratorAdapter.execute();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 5);

        await this.forgotPasswordRepository.execute({
            user_id: user.id,
            token,
            expires_at: expiresAt,
        });

        await this.emailAdapter.sendPasswordResetEmail(user.email, token);

        return;
    }
}
