import express from 'express';
import { loginUser, newLastLogin } from '../services';
import jwt from 'jsonwebtoken';
import { DATA_SOURCES } from '../../config/dataSources';
const dataSource = DATA_SOURCES.jwtDataSourse;

const route = express.Router();

export const login = route.post('/login', async (req, res) => {
    try {
        const foundUser = await loginUser(req.body);

        if (!foundUser) {
            return res
                .status(401)
                .json({ message: 'Email or password is not valid' });
        }

        if (foundUser.blocked === 1) {
            return res.status(403).json({ message: 'User is blocked' });
        }

        const token = jwt.sign(
            { username: foundUser.username, id: foundUser.id },
            dataSource.SECRET as string
        );

        await newLastLogin(foundUser.id);

        return res.status(201).json({ token, foundUser });
    } catch (err) {
        return res.status(500).json({ message: 'Error occurred during login' });
    }
});
