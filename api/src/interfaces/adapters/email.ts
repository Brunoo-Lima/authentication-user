export interface IEmailAdapter {
    sendVerificationEmail(to: string, token: string): Promise<void>;
}
