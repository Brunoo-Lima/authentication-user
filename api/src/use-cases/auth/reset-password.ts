import { ExpiredTokenError, InvalidTokenError } from '../../errors';
import { IPasswordHashAdapter } from '../../interfaces/adapters';
import {
    IGetPasswordResetByTokenRepository,
    IMarkPasswordResetAsUsedRepository,
    IUpdateUserRepository,
} from '../../interfaces/repositories';

export class ResetPasswordUseCase {
    private getPasswordResetByTokenRepository: IGetPasswordResetByTokenRepository;
    private passwordHashAdapter: IPasswordHashAdapter;
    private updateUserRepository: IUpdateUserRepository;
    private markPasswordResetAsUsedRepository: IMarkPasswordResetAsUsedRepository;

    constructor(
        getPasswordResetByTokenRepository: IGetPasswordResetByTokenRepository,
        passwordHashAdapter: IPasswordHashAdapter,
        updateUserRepository: IUpdateUserRepository,
        markPasswordResetAsUsedRepository: IMarkPasswordResetAsUsedRepository,
    ) {
        this.getPasswordResetByTokenRepository =
            getPasswordResetByTokenRepository;
        this.passwordHashAdapter = passwordHashAdapter;
        this.updateUserRepository = updateUserRepository;
        this.markPasswordResetAsUsedRepository =
            markPasswordResetAsUsedRepository;
    }

    async execute(token: string, password: string) {
        const passwordReset =
            await this.getPasswordResetByTokenRepository.execute(token);

        if (!passwordReset || passwordReset.used_at) {
            throw new InvalidTokenError();
        }

        if (passwordReset.expires_at < new Date()) {
            throw new ExpiredTokenError();
        }

        const hashedPassword = await this.passwordHashAdapter.execute(password);

        await this.markPasswordResetAsUsedRepository.execute(token);

        await this.updateUserRepository.execute(passwordReset.user_id, {
            password: hashedPassword,
        });
    }
}
