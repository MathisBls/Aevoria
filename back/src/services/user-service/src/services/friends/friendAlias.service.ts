import {
  getAllFriendAliases as getAllFriendAliasesModel,
  getFriendAliasById as getFriendAliasByIdModel,
  getFriendAliasesByUserId as getFriendAliasesByUserIdModel,
  createFriendAlias as createFriendAliasModel,
  updateFriendAlias as updateFriendAliasModel,
  deleteFriendAlias as deleteFriendAliasModel,
} from '../../models/friends/friendAlias.model';
import type { FriendAlias } from '../../types/friends/friendAliasInterface';

export const getAllFriendAliases = async (): Promise<FriendAlias[]> => {
  return await getAllFriendAliasesModel();
};

export const getFriendAliasById = async (id: string): Promise<FriendAlias | null> => {
  return await getFriendAliasByIdModel(id);
};

export const getFriendAliasesByUserId = async (userId: string): Promise<FriendAlias[]> => {
  return await getFriendAliasesByUserIdModel(userId);
};

export const createFriendAlias = async (aliasData: Omit<FriendAlias, 'id_friend_aliases' | 'create_at'>): Promise<string> => {
  return await createFriendAliasModel(aliasData);
};

export const updateFriendAlias = async (id: string, aliasData: Partial<Omit<FriendAlias, 'id_friend_aliases' | 'create_at'>>): Promise<boolean> => {
  return await updateFriendAliasModel(id, aliasData);
};

export const deleteFriendAlias = async (id: string): Promise<boolean> => {
  return await deleteFriendAliasModel(id);
};

