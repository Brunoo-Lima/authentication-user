import {
    EmailAdapter,
    PasswordComparatorAdapter,
    PasswordHashAdapter,
    TokenEmailGeneratorAdapter,
    TokensGeneratorAdapter,
    TokenVerifierAdapter,
} from '../../adapters';
import {
    ForgotPasswordController,
    LoginController,
    RefreshTokenController,
    ResetPasswordController,
} from '../../controllers';
import {
    PostgresForgotPasswordRepository,
    PostgresGetSessionByRefreshTokenRepository,
    PostgresGetPasswordResetByTokenRepository,
    PostgresGetUserByEmailRepository,
    PostgresMarkPasswordResetAsUsedRepository,
    PostgresRegisterSessionRepository,
    PostgresUpdateSessionRefreshTokenRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postgres';
import {
    ForgotPasswordUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    ResetPasswordUseCase,
} from '../../use-cases';

export const makeLoginController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const passwordComparatorAdapter = new PasswordComparatorAdapter();
    const tokensGeneratorAdapter = new TokensGeneratorAdapter();
    const registerSessionRepository = new PostgresRegisterSessionRepository();
    const loginUseCase = new LoginUseCase(
        getUserByEmailRepository,
        passwordComparatorAdapter,
        tokensGeneratorAdapter,
        registerSessionRepository,
    );

    const loginController = new LoginController(loginUseCase);

    return loginController;
};

export const makeRefreshTokenController = () => {
    const tokensGeneratorAdapter = new TokensGeneratorAdapter();
    const tokenVerifierAdapter = new TokenVerifierAdapter();
    const getSessionByRefreshTokenRepository =
        new PostgresGetSessionByRefreshTokenRepository();
    const updateSessionRefreshTokenRepository =
        new PostgresUpdateSessionRefreshTokenRepository();
    const refreshTokenUseCase = new RefreshTokenUseCase(
        tokensGeneratorAdapter,
        tokenVerifierAdapter,
        getSessionByRefreshTokenRepository,
        updateSessionRefreshTokenRepository,
    );

    const refreshTokenController = new RefreshTokenController(
        refreshTokenUseCase,
    );

    return refreshTokenController;
};

export const makeForgotPasswordController = () => {
    const forgotPasswordRepository = new PostgresForgotPasswordRepository();
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const tokensEmailGeneratorAdapter = new TokenEmailGeneratorAdapter();
    const emailAdapter = new EmailAdapter();

    const forgotPasswordUseCase = new ForgotPasswordUseCase(
        forgotPasswordRepository,
        getUserByEmailRepository,
        tokensEmailGeneratorAdapter,
        emailAdapter,
    );

    const forgotPasswordController = new ForgotPasswordController(
        forgotPasswordUseCase,
    );

    return forgotPasswordController;
};

export const makeResetPasswordController = () => {
    const getPasswordResetByTokenRepository =
        new PostgresGetPasswordResetByTokenRepository();
    const passwordHashAdapter = new PasswordHashAdapter();
    const updateUserRepository = new PostgresUpdateUserRepository();
    const markPasswordResetAsUsedRepository =
        new PostgresMarkPasswordResetAsUsedRepository();

    const resetPasswordUseCase = new ResetPasswordUseCase(
        getPasswordResetByTokenRepository,
        passwordHashAdapter,
        updateUserRepository,
        markPasswordResetAsUsedRepository,
    );

    const resetPasswordController = new ResetPasswordController(
        resetPasswordUseCase,
    );

    return resetPasswordController;
};
