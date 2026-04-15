export interface ISession {
    user_id: string;
    refresh_token: string;
    user_agent?: string | null;
    ip_address?: string | null;
}
