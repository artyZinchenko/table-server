import express from 'express';
import { insertUser } from '../services';
import { toNewUser } from '../utils/toNewUser';
import { Fields } from '../models';

const route = express.Router();

export const addUser = route.post('/addUser', async (req, res) => {
    try {
        const user: Fields = req.body;
        const newUser = toNewUser(user);

        if (!newUser)
            throw new Error('User data does not match required format');

        await insertUser(newUser);
        res.status(200).json({ message: 'Data added successfully' });
    } catch (error) {
        let message = 'Error adding user. ';
        if (error instanceof Error) {
            message += error.message;
        }
        res.status(500).json({
            message,
        });
    }
});
