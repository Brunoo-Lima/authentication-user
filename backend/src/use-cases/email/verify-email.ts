import {
    EmailAlreadyVerifiedError,
    ExpiredTokenError,
    InvalidTokenError,
} from '../../errors';
import {
    IGetEmailVerificationByTokenRepository,
    IVerifyEmailRepository,
} from '../../interfaces/repositories';

export class VerifyEmailUseCase {
    private getEmailVerificationByTokenRepository: IGetEmailVerificationByTokenRepository;
    private verifyEmailRepository: IVerifyEmailRepository;

    constructor(
        getEmailVerificationByTokenRepository: IGetEmailVerificationByTokenRepository,
        verifyEmailRepository: IVerifyEmailRepository,
    ) {
        this.getEmailVerificationByTokenRepository =
            getEmailVerificationByTokenRepository;
        this.verifyEmailRepository = verifyEmailRepository;
    }

    async execute(token: string) {
        const verification =
            await this.getEmailVerificationByTokenRepository.execute(token);

        if (!verification) {
            throw new InvalidTokenError();
        }

        if (verification.expires_at < new Date()) {
            throw new ExpiredTokenError();
        }

        if (verification.verified_at) {
            throw new EmailAlreadyVerifiedError();
        }

        return await this.verifyEmailRepository.execute(
            token,
            verification.user_id,
        );
    }
}
