import { EmailAdapter } from '../email';

const mockSendMail = jest.fn().mockResolvedValue(undefined);

jest.mock('nodemailer', () => ({
    createTransport: jest.fn(() => ({
        sendMail: mockSendMail,
    })),
}));

describe('Email Adapter', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.SMTP_USER = 'smtp_user@mail.com';
        process.env.APP_URL = 'http://any-app-url.com';
        process.env.FRONTEND_URL = 'http://any-frontend-url.com';
    });

    it('should send an email', async () => {
        const sut = new EmailAdapter();

        const to = 'any_email';
        const token = 'any_token';

        await sut.sendVerificationEmail(to, token);
    });

    it('should send a password reset email', async () => {
        const sut = new EmailAdapter();

        const to = 'any_email';
        const token = 'any_token';

        await sut.sendPasswordResetEmail(to, token);
    });
});
