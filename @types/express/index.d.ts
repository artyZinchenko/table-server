import { IUser } from '../../src/api/models';

declare global {
    namespace Express {
        interface Request {
            currentUser: IUser;
        }
    }
}
