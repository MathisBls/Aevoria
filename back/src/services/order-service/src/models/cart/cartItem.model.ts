import pool from '../../db/config';
import { CartItem } from '../../types/cart/cartItemInterface';

export const getAllCartItems = async (): Promise<CartItem[]> => {
  const [rows] = await pool.execute(
    'SELECT id_cart_item, quantity, add_at, fk_id_cart, fk_id_games FROM cart_item'
  );
  return rows as CartItem[];
};

export const getCartItemById = async (id: string): Promise<CartItem | null> => {
  const [rows] = await pool.execute(
    'SELECT id_cart_item, quantity, add_at, fk_id_cart, fk_id_games FROM cart_item WHERE id_cart_item = ?',
    [id]
  );
  return (rows as CartItem[])[0] || null;
};

export const getCartItemsByCartId = async (cartId: string): Promise<CartItem[]> => {
  const [rows] = await pool.execute(
    'SELECT id_cart_item, quantity, add_at, fk_id_cart, fk_id_games FROM cart_item WHERE fk_id_cart = ?',
    [cartId]
  );
  return rows as CartItem[];
};

export const createCartItem = async (cartItemData: Omit<CartItem, 'id_cart_item' | 'add_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO cart_item (id_cart_item, quantity, fk_id_cart, fk_id_games) VALUES (UUID(), ?, ?, ?)',
    [cartItemData.quantity, cartItemData.fk_id_cart, cartItemData.fk_id_games]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_cart_item FROM cart_item WHERE fk_id_cart = ? ORDER BY add_at DESC LIMIT 1',
    [cartItemData.fk_id_cart]
  );
  return (rows as { id_cart_item: string }[])[0]?.id_cart_item || '';
};

export const updateCartItem = async (id: string, cartItemData: Partial<Omit<CartItem, 'id_cart_item' | 'add_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (cartItemData.quantity !== undefined) {
    fields.push('quantity = ?');
    values.push(cartItemData.quantity);
  }
  if (cartItemData.fk_id_cart !== undefined) {
    fields.push('fk_id_cart = ?');
    values.push(cartItemData.fk_id_cart);
  }
  if (cartItemData.fk_id_games !== undefined) {
    fields.push('fk_id_games = ?');
    values.push(cartItemData.fk_id_games);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE cart_item SET ${fields.join(', ')} WHERE id_cart_item = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteCartItem = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM cart_item WHERE id_cart_item = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

