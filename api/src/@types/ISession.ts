export interface ISession {
    user_id: string;
    refresh_token: string;
    user_agent?: string | null;
    ip_address?: string | null;
}

export interface ISessionRecord extends ISession {
    id: string;
    expires_at: Date;
    created_at: Date;
}
