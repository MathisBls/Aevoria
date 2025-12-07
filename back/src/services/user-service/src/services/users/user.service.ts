import {
  getAllUsers as getAllUsersModel,
  getUserById as getUserByIdModel,
  createUser as createUserModel,
  updateUser as updateUserModel,
  deleteUser as deleteUserModel,
} from '../../models/users/user.model';
import type { User } from '../../types/users/userInterface';

export const getAllUsers = async (): Promise<User[]> => {
  return await getAllUsersModel();
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await getUserByIdModel(id);
};

export const createUser = async (userData: Omit<User, 'id_user' | 'created_at'>): Promise<string> => {
  return await createUserModel(userData);
};

export const updateUser = async (id: string, userData: Partial<Omit<User, 'id_user' | 'created_at'>>): Promise<boolean> => {
  return await updateUserModel(id, userData);
};

export const deleteUser = async (id: string): Promise<boolean> => {
  return await deleteUserModel(id);
};
