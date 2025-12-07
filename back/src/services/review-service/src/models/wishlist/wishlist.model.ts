import pool from '../../db/config';
import { Wishlist } from '../../types/wishlist/wishlistInterface';

export const getAllWishlists = async (): Promise<Wishlist[]> => {
  const [rows] = await pool.execute(
    'SELECT id_wishlist, add_at, fk_id_user, fk_id_games FROM wishlist'
  );
  return rows as Wishlist[];
};

export const getWishlistById = async (id: string): Promise<Wishlist | null> => {
  const [rows] = await pool.execute(
    'SELECT id_wishlist, add_at, fk_id_user, fk_id_games FROM wishlist WHERE id_wishlist = ?',
    [id]
  );
  return (rows as Wishlist[])[0] || null;
};

export const getWishlistsByUserId = async (userId: string): Promise<Wishlist[]> => {
  const [rows] = await pool.execute(
    'SELECT id_wishlist, add_at, fk_id_user, fk_id_games FROM wishlist WHERE fk_id_user = ?',
    [userId]
  );
  return rows as Wishlist[];
};

export const getWishlistByUserAndGameId = async (userId: string, gameId: string): Promise<Wishlist | null> => {
  const [rows] = await pool.execute(
    'SELECT id_wishlist, add_at, fk_id_user, fk_id_games FROM wishlist WHERE fk_id_user = ? AND fk_id_games = ?',
    [userId, gameId]
  );
  return (rows as Wishlist[])[0] || null;
};

export const createWishlist = async (wishlistData: Omit<Wishlist, 'id_wishlist' | 'add_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO wishlist (id_wishlist, fk_id_user, fk_id_games) VALUES (UUID(), ?, ?)',
    [wishlistData.fk_id_user, wishlistData.fk_id_games]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_wishlist FROM wishlist WHERE fk_id_user = ? ORDER BY add_at DESC LIMIT 1',
    [wishlistData.fk_id_user]
  );
  return (rows as { id_wishlist: string }[])[0]?.id_wishlist || '';
};

export const deleteWishlist = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM wishlist WHERE id_wishlist = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

export const deleteWishlistByUserAndGameId = async (userId: string, gameId: string): Promise<boolean> => {
  const [result] = await pool.execute(
    'DELETE FROM wishlist WHERE fk_id_user = ? AND fk_id_games = ?',
    [userId, gameId]
  ) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

