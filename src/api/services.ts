import { execute } from './utils/mysql.connector';
import { UserQueries } from './queries';
import { DecodedToken, NewUser, IUser } from './models';

export const getUsers = async (): Promise<IUser[]> => {
  return execute(UserQueries.GetUsers, []);
};

export const checkUser = async (user: DecodedToken): Promise<IUser> => {
  const result: IUser[] = await execute(UserQueries.FindUser, [
    user.id,
    user.username,
  ]);
  return result[0];
};

export const newLastLogin = async (id: number) => {
  return await execute(UserQueries.UpdateLastLogin, [id]);
};

export const updateBlocked = async (ids: number[]) => {
  return await execute(UserQueries.UpdateBlocked, [ids]);
};

export const updateUnblocked = async (ids: number[]) => {
  return await execute(UserQueries.UpdateUnblocked, [ids]);
};

export const deleteUsers = async (ids: number[]) => {
  return await execute(UserQueries.DeleteUsers, [ids]);
};

export const loginUser = async (data: any): Promise<IUser> => {
  const result: IUser[] = await execute(UserQueries.LoginUser, [
    data.email,
    data.password,
  ]);
  return result[0];
};

export const insertUser = async (user: NewUser) => {
  const result = await execute(UserQueries.AddUser, [
    user.username,
    user.email,
    user.password,
  ]);
  return result;
};
