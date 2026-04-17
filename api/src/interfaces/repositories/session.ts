import { ISession, ISessionRecord } from '../../@types/ISession';

export interface IRegisterSessionRepository {
    execute: (session: ISession) => Promise<void>;
}

export interface IGetSessionByRefreshTokenRepository {
    execute: (refreshToken: string) => Promise<ISessionRecord | null>;
}

export interface IUpdateSessionRefreshTokenRepository {
    execute: (
        sessionId: string,
        refreshToken: string,
        expiresAt: Date,
    ) => Promise<void>;
}
