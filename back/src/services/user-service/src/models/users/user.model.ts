import pool from '../../db/config';
import { User } from '../../types/users/userInterface';

export const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await pool.execute(
    'SELECT id_user, first_name, last_name, username, email, subscription_type, wallet_balance, language_preference, provider, created_at, fk_id_role FROM user'
  );
  return rows as User[];
};

export const getUserById = async (id: string): Promise<User | null> => {
  const [rows] = await pool.execute(
    'SELECT id_user, first_name, last_name, username, email, subscription_type, wallet_balance, language_preference, provider, created_at, fk_id_role FROM user WHERE id_user = ?',
    [id]
  );
  return (rows as User[])[0] || null;
};

export const createUser = async (userData: Omit<User, 'id_user' | 'created_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO user (id_user, first_name, last_name, username, email, password_hash, password_salt, subscription_type, wallet_balance, language_preference, provider, fk_id_role) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      userData.first_name,
      userData.last_name,
      userData.username,
      userData.email,
      userData.password_hash,
      userData.password_salt,
      userData.subscription_type,
      userData.wallet_balance,
      userData.language_preference,
      userData.provider,
      userData.fk_id_role,
    ]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_user FROM user WHERE username = ? ORDER BY created_at DESC LIMIT 1',
    [userData.username]
  );
  return (rows as { id_user: string }[])[0]?.id_user || '';
};

export const updateUser = async (id: string, userData: Partial<Omit<User, 'id_user' | 'created_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (userData.first_name !== undefined) {
    fields.push('first_name = ?');
    values.push(userData.first_name);
  }
  if (userData.last_name !== undefined) {
    fields.push('last_name = ?');
    values.push(userData.last_name);
  }
  if (userData.username !== undefined) {
    fields.push('username = ?');
    values.push(userData.username);
  }
  if (userData.email !== undefined) {
    fields.push('email = ?');
    values.push(userData.email);
  }
  if (userData.password_hash !== undefined) {
    fields.push('password_hash = ?');
    values.push(userData.password_hash);
  }
  if (userData.password_salt !== undefined) {
    fields.push('password_salt = ?');
    values.push(userData.password_salt);
  }
  if (userData.subscription_type !== undefined) {
    fields.push('subscription_type = ?');
    values.push(userData.subscription_type);
  }
  if (userData.wallet_balance !== undefined) {
    fields.push('wallet_balance = ?');
    values.push(userData.wallet_balance);
  }
  if (userData.language_preference !== undefined) {
    fields.push('language_preference = ?');
    values.push(userData.language_preference);
  }
  if (userData.provider !== undefined) {
    fields.push('provider = ?');
    values.push(userData.provider);
  }
  if (userData.fk_id_role !== undefined) {
    fields.push('fk_id_role = ?');
    values.push(userData.fk_id_role);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE user SET ${fields.join(', ')} WHERE id_user = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute(
    'DELETE FROM user WHERE id_user = ?',
    [id]
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};
