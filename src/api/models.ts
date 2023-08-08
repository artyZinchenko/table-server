export interface User {
    id: number;
    username: string;
    email: string;
    blocked: number;
    lastLogin: string;
    password: string;
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    blocked: number;
    lastLogin: string;
    registrationDate: string;
}

export interface Fields {
    username: unknown;
    email: unknown;
    password: unknown;
}

export interface LoginResponse {
    username: string;
    id: number;
}

export interface NewUser extends Omit<User, 'id' | 'blocked' | 'lastLogin'> {}

export interface DecodedToken {
    id: number;
    username: string;
}
