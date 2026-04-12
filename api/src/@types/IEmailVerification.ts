export interface IEmailVerification {
    user_id: string;
    token: string;
    expires_at: Date;
    verified_at: Date | null;
}
