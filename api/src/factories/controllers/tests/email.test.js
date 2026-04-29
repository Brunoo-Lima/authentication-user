import { makeVerifyEmailController } from '../email';
import { VerifyEmailController } from '../../../controllers';

describe('Email Controller Factory', () => {
    it('should return a valid VerifyEmailController instance', () => {
        expect(makeVerifyEmailController()).toBeInstanceOf(
            VerifyEmailController,
        );
    });
});
