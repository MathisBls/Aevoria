import pool from '../../db/config';
import { Cart } from '../../types/cart/cartInterface';

export const getAllCarts = async (): Promise<Cart[]> => {
  const [rows] = await pool.execute('SELECT id_cart, created_at, fk_id_user FROM cart');
  return rows as Cart[];
};

export const getCartById = async (id: string): Promise<Cart | null> => {
  const [rows] = await pool.execute('SELECT id_cart, created_at, fk_id_user FROM cart WHERE id_cart = ?', [id]);
  return (rows as Cart[])[0] || null;
};

export const getCartsByUserId = async (userId: string): Promise<Cart[]> => {
  const [rows] = await pool.execute('SELECT id_cart, created_at, fk_id_user FROM cart WHERE fk_id_user = ?', [userId]);
  return rows as Cart[];
};

export const createCart = async (cartData: Omit<Cart, 'id_cart' | 'created_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO cart (id_cart, fk_id_user) VALUES (UUID(), ?)',
    [cartData.fk_id_user]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_cart FROM cart WHERE fk_id_user = ? ORDER BY created_at DESC LIMIT 1',
    [cartData.fk_id_user]
  );
  return (rows as { id_cart: string }[])[0]?.id_cart || '';
};

export const updateCart = async (id: string, cartData: Partial<Omit<Cart, 'id_cart' | 'created_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (cartData.fk_id_user !== undefined) {
    fields.push('fk_id_user = ?');
    values.push(cartData.fk_id_user);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE cart SET ${fields.join(', ')} WHERE id_cart = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteCart = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM cart WHERE id_cart = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

