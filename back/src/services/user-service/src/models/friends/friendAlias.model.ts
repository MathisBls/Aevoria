import pool from '../../db/config';
import { FriendAlias } from '../../types/friends/friendAliasInterface';

export const getAllFriendAliases = async (): Promise<FriendAlias[]> => {
  const [rows] = await pool.execute(
    'SELECT id_friend_aliases, custom_name, create_at, fk_id_user, fk_id_friend FROM friend_aliases'
  );
  return rows as FriendAlias[];
};

export const getFriendAliasById = async (id: string): Promise<FriendAlias | null> => {
  const [rows] = await pool.execute(
    'SELECT id_friend_aliases, custom_name, create_at, fk_id_user, fk_id_friend FROM friend_aliases WHERE id_friend_aliases = ?',
    [id]
  );
  return (rows as FriendAlias[])[0] || null;
};

export const getFriendAliasesByUserId = async (userId: string): Promise<FriendAlias[]> => {
  const [rows] = await pool.execute(
    'SELECT id_friend_aliases, custom_name, create_at, fk_id_user, fk_id_friend FROM friend_aliases WHERE fk_id_user = ?',
    [userId]
  );
  return rows as FriendAlias[];
};

export const createFriendAlias = async (aliasData: Omit<FriendAlias, 'id_friend_aliases' | 'create_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO friend_aliases (id_friend_aliases, custom_name, fk_id_user, fk_id_friend) VALUES (UUID(), ?, ?, ?)',
    [aliasData.custom_name, aliasData.fk_id_user, aliasData.fk_id_friend]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_friend_aliases FROM friend_aliases WHERE fk_id_user = ? AND fk_id_friend = ? ORDER BY create_at DESC LIMIT 1',
    [aliasData.fk_id_user, aliasData.fk_id_friend]
  );
  return (rows as { id_friend_aliases: string }[])[0]?.id_friend_aliases || '';
};

export const updateFriendAlias = async (id: string, aliasData: Partial<Omit<FriendAlias, 'id_friend_aliases' | 'create_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (aliasData.custom_name !== undefined) {
    fields.push('custom_name = ?');
    values.push(aliasData.custom_name);
  }
  if (aliasData.fk_id_user !== undefined) {
    fields.push('fk_id_user = ?');
    values.push(aliasData.fk_id_user);
  }
  if (aliasData.fk_id_friend !== undefined) {
    fields.push('fk_id_friend = ?');
    values.push(aliasData.fk_id_friend);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE friend_aliases SET ${fields.join(', ')} WHERE id_friend_aliases = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteFriendAlias = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM friend_aliases WHERE id_friend_aliases = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

