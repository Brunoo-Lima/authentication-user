import { ISession } from '../../@types/ISession';

export interface IRegisterSessionRepository {
    execute: (session: ISession) => Promise<ISession>;
}
