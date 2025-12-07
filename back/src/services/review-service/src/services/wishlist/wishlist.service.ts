import {
  getAllWishlists as getAllWishlistsModel,
  getWishlistById as getWishlistByIdModel,
  getWishlistsByUserId as getWishlistsByUserIdModel,
  getWishlistByUserAndGameId as getWishlistByUserAndGameIdModel,
  createWishlist as createWishlistModel,
  deleteWishlist as deleteWishlistModel,
  deleteWishlistByUserAndGameId as deleteWishlistByUserAndGameIdModel,
} from '../../models/wishlist/wishlist.model';
import type { Wishlist } from '../../types/wishlist/wishlistInterface';

export const getAllWishlists = async (): Promise<Wishlist[]> => {
  return await getAllWishlistsModel();
};

export const getWishlistById = async (id: string): Promise<Wishlist | null> => {
  return await getWishlistByIdModel(id);
};

export const getWishlistsByUserId = async (userId: string): Promise<Wishlist[]> => {
  return await getWishlistsByUserIdModel(userId);
};

export const getWishlistByUserAndGameId = async (userId: string, gameId: string): Promise<Wishlist | null> => {
  return await getWishlistByUserAndGameIdModel(userId, gameId);
};

export const createWishlist = async (wishlistData: Omit<Wishlist, 'id_wishlist' | 'add_at'>): Promise<string> => {
  return await createWishlistModel(wishlistData);
};

export const deleteWishlist = async (id: string): Promise<boolean> => {
  return await deleteWishlistModel(id);
};

export const deleteWishlistByUserAndGameId = async (userId: string, gameId: string): Promise<boolean> => {
  return await deleteWishlistByUserAndGameIdModel(userId, gameId);
};

