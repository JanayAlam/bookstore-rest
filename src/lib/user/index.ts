import { User } from "../../models";
import { IUser } from "../../types/user-types";

export const create = async (
  username: string,
  password: string,
): Promise<number> => {
  const user = await User.insert({
    username,
    password,
  });
  return user.id;
};

export const getById = async (id: number): Promise<IUser | null> => {
  return User.findById(id);
};

export const getByUsername = async (
  username: string,
): Promise<IUser | null> => {
  return User.findByUsername(username);
};
