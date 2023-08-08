import { Request } from 'express';

export const extractToken = (request: Request) => {
    const authorization = request.get('Authorization');

    if (authorization?.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};
