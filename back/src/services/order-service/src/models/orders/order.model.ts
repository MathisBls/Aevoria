import pool from '../../db/config';
import { Order } from '../../types/orders/orderInterface';

export const getAllOrders = async (): Promise<Order[]> => {
  const [rows] = await pool.execute(
    'SELECT id_order, total_price, order_date, status, payment_method, currency, updated_at, fk_id_user FROM `order`'
  );
  return rows as Order[];
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  const [rows] = await pool.execute(
    'SELECT id_order, total_price, order_date, status, payment_method, currency, updated_at, fk_id_user FROM `order` WHERE id_order = ?',
    [id]
  );
  return (rows as Order[])[0] || null;
};

export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  const [rows] = await pool.execute(
    'SELECT id_order, total_price, order_date, status, payment_method, currency, updated_at, fk_id_user FROM `order` WHERE fk_id_user = ?',
    [userId]
  );
  return rows as Order[];
};

export const createOrder = async (orderData: Omit<Order, 'id_order' | 'order_date' | 'updated_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO `order` (id_order, total_price, status, payment_method, currency, fk_id_user) VALUES (UUID(), ?, ?, ?, ?, ?)',
    [orderData.total_price, orderData.status, orderData.payment_method, orderData.currency, orderData.fk_id_user]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_order FROM `order` WHERE fk_id_user = ? ORDER BY order_date DESC LIMIT 1',
    [orderData.fk_id_user]
  );
  return (rows as { id_order: string }[])[0]?.id_order || '';
};

export const updateOrder = async (id: string, orderData: Partial<Omit<Order, 'id_order' | 'order_date'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (orderData.total_price !== undefined) {
    fields.push('total_price = ?');
    values.push(orderData.total_price);
  }
  if (orderData.status !== undefined) {
    fields.push('status = ?');
    values.push(orderData.status);
  }
  if (orderData.payment_method !== undefined) {
    fields.push('payment_method = ?');
    values.push(orderData.payment_method);
  }
  if (orderData.currency !== undefined) {
    fields.push('currency = ?');
    values.push(orderData.currency);
  }
  if (orderData.updated_at !== undefined) {
    fields.push('updated_at = ?');
    values.push(orderData.updated_at);
  }
  if (orderData.fk_id_user !== undefined) {
    fields.push('fk_id_user = ?');
    values.push(orderData.fk_id_user);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE \`order\` SET ${fields.join(', ')} WHERE id_order = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM `order` WHERE id_order = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

