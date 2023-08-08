import express from 'express';
import { getUsers } from '../services';
import { getCurrentUser } from '../middleware/getCurrentUser';

const route = express.Router();

route.use(getCurrentUser);

export const getAll = route.get('/', async (_req, res) => {
    try {
        const users = await getUsers();

        return res.status(200).json({
            users,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching users',
        });
    }
});
