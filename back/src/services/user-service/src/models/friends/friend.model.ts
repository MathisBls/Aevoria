import pool from '../../db/config';
import { Friend } from '../../types/friends/friendInterface';

export const getAllFriends = async (): Promise<Friend[]> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_user, fk_id_friend, status, create_at FROM friend'
  );
  return rows as Friend[];
};

export const getFriendByUserAndFriendId = async (userId: string, friendId: string): Promise<Friend | null> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_user, fk_id_friend, status, create_at FROM friend WHERE fk_id_user = ? AND fk_id_friend = ?',
    [userId, friendId]
  );
  return (rows as Friend[])[0] || null;
};

export const getFriendsByUserId = async (userId: string): Promise<Friend[]> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_user, fk_id_friend, status, create_at FROM friend WHERE fk_id_user = ?',
    [userId]
  );
  return rows as Friend[];
};

export const createFriend = async (friendData: Omit<Friend, 'create_at'>): Promise<boolean> => {
  const [result] = await pool.execute(
    'INSERT INTO friend (fk_id_user, fk_id_friend, status) VALUES (?, ?, ?)',
    [friendData.fk_id_user, friendData.fk_id_friend, friendData.status]
  ) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

export const updateFriend = async (userId: string, friendId: string, friendData: Partial<Omit<Friend, 'fk_id_user' | 'fk_id_friend' | 'create_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (friendData.status !== undefined) {
    fields.push('status = ?');
    values.push(friendData.status);
  }

  if (fields.length === 0) return false;

  values.push(userId, friendId);
  const [result] = await pool.execute(
    `UPDATE friend SET ${fields.join(', ')} WHERE fk_id_user = ? AND fk_id_friend = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteFriend = async (userId: string, friendId: string): Promise<boolean> => {
  const [result] = await pool.execute(
    'DELETE FROM friend WHERE fk_id_user = ? AND fk_id_friend = ?',
    [userId, friendId]
  ) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

