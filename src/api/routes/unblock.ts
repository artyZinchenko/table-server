import express from 'express';
import { getUsers, updateUnblocked } from '../services';
import { getCurrentUser } from '../middleware/getCurrentUser';

const route = express.Router();

route.use(getCurrentUser);

export const unblock = route.put('/unblock', async (req, res, next) => {
  try {
    if (!req.currentUser || req.currentUser?.blocked === 1)
      next(req.currentUser);

    await updateUnblocked(req.body.ids as number[]);
    const result = await getUsers();

    return res.status(200).json({ users: result });
  } catch (error) {
    return res.status(500).json({
      message: 'There was an error when updating users',
    });
  }
});