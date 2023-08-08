import { Fields, NewUser } from '../models';

export const toNewUser = ({
    username,
    email,
    password,
}: Fields): NewUser | null => {
    try {
        const newUser = {
            username: parseString('username', username),
            email: parseString('email', email),
            password: parseString('parseString', password),
        };
        return newUser;
    } catch (err) {
        console.log('problem with', err);
        return null;
    }
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (label: string, text: unknown): string => {
    if (!isString(text)) {
        throw new Error(`Incorrect or missing ${label}`);
    }
    return text;
};
