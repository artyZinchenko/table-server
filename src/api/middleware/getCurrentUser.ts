import { Request, Response, NextFunction } from 'express';
import { extractToken } from '../utils/tokenFunctions/extractToken';
import { verifyToken } from '../utils/tokenFunctions/verifyToken';

export const getCurrentUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const extractedToken = extractToken(req);
    const user = await verifyToken(extractedToken);

    if (!user)
      throw new Error('There was an error with auth token, please relogin');

    if (user.blocked === 1) throw new Error('User is blocked');

    req.currentUser = user;
    next();
  } catch (err) {
    next(err);
  }
};
