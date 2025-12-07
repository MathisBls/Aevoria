import pool from '../../db/config';
import { OrderItem } from '../../types/orders/orderItemInterface';

export const getAllOrderItems = async (): Promise<OrderItem[]> => {
  const [rows] = await pool.execute(
    'SELECT id_order_item, quantity, price, fk_id_order, fk_id_games FROM order_item'
  );
  return rows as OrderItem[];
};

export const getOrderItemById = async (id: string): Promise<OrderItem | null> => {
  const [rows] = await pool.execute(
    'SELECT id_order_item, quantity, price, fk_id_order, fk_id_games FROM order_item WHERE id_order_item = ?',
    [id]
  );
  return (rows as OrderItem[])[0] || null;
};

export const getOrderItemsByOrderId = async (orderId: string): Promise<OrderItem[]> => {
  const [rows] = await pool.execute(
    'SELECT id_order_item, quantity, price, fk_id_order, fk_id_games FROM order_item WHERE fk_id_order = ?',
    [orderId]
  );
  return rows as OrderItem[];
};

export const createOrderItem = async (orderItemData: Omit<OrderItem, 'id_order_item'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO order_item (id_order_item, quantity, price, fk_id_order, fk_id_games) VALUES (UUID(), ?, ?, ?, ?)',
    [orderItemData.quantity, orderItemData.price, orderItemData.fk_id_order, orderItemData.fk_id_games]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_order_item FROM order_item WHERE fk_id_order = ? ORDER BY id_order_item DESC LIMIT 1',
    [orderItemData.fk_id_order]
  );
  return (rows as { id_order_item: string }[])[0]?.id_order_item || '';
};

export const updateOrderItem = async (id: string, orderItemData: Partial<Omit<OrderItem, 'id_order_item'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (orderItemData.quantity !== undefined) {
    fields.push('quantity = ?');
    values.push(orderItemData.quantity);
  }
  if (orderItemData.price !== undefined) {
    fields.push('price = ?');
    values.push(orderItemData.price);
  }
  if (orderItemData.fk_id_order !== undefined) {
    fields.push('fk_id_order = ?');
    values.push(orderItemData.fk_id_order);
  }
  if (orderItemData.fk_id_games !== undefined) {
    fields.push('fk_id_games = ?');
    values.push(orderItemData.fk_id_games);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE order_item SET ${fields.join(', ')} WHERE id_order_item = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteOrderItem = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM order_item WHERE id_order_item = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

