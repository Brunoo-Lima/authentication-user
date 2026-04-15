import {
    EmailAdapter,
    PasswordComparatorAdapter,
    TokenEmailGeneratorAdapter,
    TokensGeneratorAdapter,
    TokenVerifierAdapter,
} from '../../adapters';
import {
    ForgotPasswordController,
    LoginController,
    RefreshTokenController,
} from '../../controllers';
import {
    PostgresForgotPasswordRepository,
    PostgresGetUserByEmailRepository,
    PostgresRegisterSessionRepository,
} from '../../repositories/postgres';
import {
    ForgotPasswordUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
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
    const refreshTokenUseCase = new RefreshTokenUseCase(
        tokensGeneratorAdapter,
        tokenVerifierAdapter,
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
