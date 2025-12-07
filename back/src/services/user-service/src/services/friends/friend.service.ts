import {
  getAllFriends as getAllFriendsModel,
  getFriendByUserAndFriendId as getFriendByUserAndFriendIdModel,
  getFriendsByUserId as getFriendsByUserIdModel,
  createFriend as createFriendModel,
  updateFriend as updateFriendModel,
  deleteFriend as deleteFriendModel,
} from '../../models/friends/friend.model';
import type { Friend } from '../../types/friends/friendInterface';

export const getAllFriends = async (): Promise<Friend[]> => {
  return await getAllFriendsModel();
};

export const getFriendByUserAndFriendId = async (userId: string, friendId: string): Promise<Friend | null> => {
  return await getFriendByUserAndFriendIdModel(userId, friendId);
};

export const getFriendsByUserId = async (userId: string): Promise<Friend[]> => {
  return await getFriendsByUserIdModel(userId);
};

export const createFriend = async (friendData: Omit<Friend, 'create_at'>): Promise<boolean> => {
  return await createFriendModel(friendData);
};

export const updateFriend = async (userId: string, friendId: string, friendData: Partial<Omit<Friend, 'fk_id_user' | 'fk_id_friend' | 'create_at'>>): Promise<boolean> => {
  return await updateFriendModel(userId, friendId, friendData);
};

export const deleteFriend = async (userId: string, friendId: string): Promise<boolean> => {
  return await deleteFriendModel(userId, friendId);
};

