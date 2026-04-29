import { VerifyEmailController } from '../../controllers';
import {
    PostgresGetEmailVerificationByTokenRepository,
    PostgresVerifyEmailRepository,
} from '../../repositories/postgres';
import { VerifyEmailUseCase } from '../../use-cases';

export const makeVerifyEmailController = () => {
    const getEmailVerificationByTokenRepository =
        new PostgresGetEmailVerificationByTokenRepository();
    const verifyEmailRepository = new PostgresVerifyEmailRepository();

    const verifyEmailUseCase = new VerifyEmailUseCase(
        getEmailVerificationByTokenRepository,
        verifyEmailRepository,
    );

    const verifyEmailController = new VerifyEmailController(verifyEmailUseCase);

    return verifyEmailController;
};
