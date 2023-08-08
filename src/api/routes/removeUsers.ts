import express from 'express';
import { deleteUsers, getUsers } from '../services';
import { getCurrentUser } from '../middleware/getCurrentUser';

const route = express.Router();

route.use(getCurrentUser);

export const removeUsers = route.delete(
  '/removeUsers/:number',
  async (req, res, next) => {
    try {
      if (!req.currentUser || req.currentUser?.blocked === 1)
        next(req.currentUser);

      const ids = req.params.number.split(',').map((i) => Number(i));

      await deleteUsers(ids);
      const result = await getUsers();

      return res.status(200).json({ users: result });
    } catch (error) {
      return res.status(500).json({
        message: 'There was an error when deleting user',
      });
    }
  }
);
