import jwt from 'jsonwebtoken';
import { DATA_SOURCES } from '../../../config/dataSources';
import { DecodedToken, IUser } from '../../models';
import { checkUser } from '../../services';
const dataSource = DATA_SOURCES.jwtDataSourse;

export const verifyToken = async (
    token: string | null
): Promise<IUser | null> => {
    try {
        if (!token) throw new Error('wrong token');
        const decodedToken = jwt.verify(token, dataSource.SECRET as string);

        const user = await checkUser(decodedToken as DecodedToken);

        if (!user) return null;
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
};
