import pool from '../../db/config';
import { Message } from '../../types/messages/messageInterface';

export const getAllMessages = async (): Promise<Message[]> => {
  const [rows] = await pool.execute(
    'SELECT id_messages, content, message_type, create_at, fk_id_user_send, fk_id_user_received FROM messages'
  );
  return rows as Message[];
};

export const getMessageById = async (id: string): Promise<Message | null> => {
  const [rows] = await pool.execute(
    'SELECT id_messages, content, message_type, create_at, fk_id_user_send, fk_id_user_received FROM messages WHERE id_messages = ?',
    [id]
  );
  return (rows as Message[])[0] || null;
};

export const getMessagesByUserId = async (userId: string): Promise<Message[]> => {
  const [rows] = await pool.execute(
    'SELECT id_messages, content, message_type, create_at, fk_id_user_send, fk_id_user_received FROM messages WHERE fk_id_user_send = ? OR fk_id_user_received = ?',
    [userId, userId]
  );
  return rows as Message[];
};

export const createMessage = async (messageData: Omit<Message, 'id_messages' | 'create_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO messages (id_messages, content, message_type, fk_id_user_send, fk_id_user_received) VALUES (UUID(), ?, ?, ?, ?)',
    [messageData.content, messageData.message_type, messageData.fk_id_user_send, messageData.fk_id_user_received]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_messages FROM messages WHERE fk_id_user_send = ? ORDER BY create_at DESC LIMIT 1',
    [messageData.fk_id_user_send]
  );
  return (rows as { id_messages: string }[])[0]?.id_messages || '';
};

export const updateMessage = async (id: string, messageData: Partial<Omit<Message, 'id_messages' | 'create_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (messageData.content !== undefined) {
    fields.push('content = ?');
    values.push(messageData.content);
  }
  if (messageData.message_type !== undefined) {
    fields.push('message_type = ?');
    values.push(messageData.message_type);
  }
  if (messageData.fk_id_user_send !== undefined) {
    fields.push('fk_id_user_send = ?');
    values.push(messageData.fk_id_user_send);
  }
  if (messageData.fk_id_user_received !== undefined) {
    fields.push('fk_id_user_received = ?');
    values.push(messageData.fk_id_user_received);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE messages SET ${fields.join(', ')} WHERE id_messages = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM messages WHERE id_messages = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

