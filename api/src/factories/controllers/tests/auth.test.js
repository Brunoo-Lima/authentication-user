import {
    makeForgotPasswordController,
    makeLoginController,
    makeRefreshTokenController,
    makeResetPasswordController,
} from '../auth';
import {
    ForgotPasswordController,
    LoginController,
    RefreshTokenController,
    ResetPasswordController,
} from '../../../controllers';

describe('Auth Controller Factory', () => {
    it('should return a valid LoginController instance', () => {
        expect(makeLoginController()).toBeInstanceOf(LoginController);
    });

    it('should return a valid RefreshTokenController instance', () => {
        expect(makeRefreshTokenController()).toBeInstanceOf(
            RefreshTokenController,
        );
    });

    it('should return a valid ForgotPasswordController instance', () => {
        expect(makeForgotPasswordController()).toBeInstanceOf(
            ForgotPasswordController,
        );
    });

    it('should return a valid ResetPasswordController instance', () => {
        expect(makeResetPasswordController()).toBeInstanceOf(
            ResetPasswordController,
        );
    });
});
