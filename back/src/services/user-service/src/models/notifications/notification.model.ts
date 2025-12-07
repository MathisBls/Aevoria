import pool from '../../db/config';
import { Notification } from '../../types/notifications/notificationInterface';

export const getAllNotifications = async (): Promise<Notification[]> => {
  const [rows] = await pool.execute(
    'SELECT id_notification, subject, message, is_important, notification_type, entity_type, attached_file, created_at FROM notification'
  );
  const notifications = rows as Array<{ is_important: number | boolean } & Omit<Notification, 'is_important'>>;
  return notifications.map(n => ({
    ...n,
    is_important: Boolean(n.is_important),
  })) as Notification[];
};

export const getNotificationById = async (id: string): Promise<Notification | null> => {
  const [rows] = await pool.execute(
    'SELECT id_notification, subject, message, is_important, notification_type, entity_type, attached_file, created_at FROM notification WHERE id_notification = ?',
    [id]
  );
  const notification = (rows as Array<{ is_important: number | boolean } & Omit<Notification, 'is_important'>>)[0];
  if (!notification) return null;
  return {
    ...notification,
    is_important: Boolean(notification.is_important),
  } as Notification;
};

export const createNotification = async (notificationData: Omit<Notification, 'id_notification' | 'created_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO notification (id_notification, subject, message, is_important, notification_type, entity_type, attached_file) VALUES (UUID(), ?, ?, ?, ?, ?, ?)',
    [
      notificationData.subject,
      notificationData.message,
      notificationData.is_important ? 1 : 0,
      notificationData.notification_type,
      notificationData.entity_type,
      notificationData.attached_file,
    ]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_notification FROM notification WHERE message = ? ORDER BY created_at DESC LIMIT 1',
    [notificationData.message]
  );
  return (rows as { id_notification: string }[])[0]?.id_notification || '';
};

export const updateNotification = async (id: string, notificationData: Partial<Omit<Notification, 'id_notification' | 'created_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (notificationData.subject !== undefined) {
    fields.push('subject = ?');
    values.push(notificationData.subject);
  }
  if (notificationData.message !== undefined) {
    fields.push('message = ?');
    values.push(notificationData.message);
  }
  if (notificationData.is_important !== undefined) {
    fields.push('is_important = ?');
    values.push(notificationData.is_important ? 1 : 0);
  }
  if (notificationData.notification_type !== undefined) {
    fields.push('notification_type = ?');
    values.push(notificationData.notification_type);
  }
  if (notificationData.entity_type !== undefined) {
    fields.push('entity_type = ?');
    values.push(notificationData.entity_type);
  }
  if (notificationData.attached_file !== undefined) {
    fields.push('attached_file = ?');
    values.push(notificationData.attached_file);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE notification SET ${fields.join(', ')} WHERE id_notification = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteNotification = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM notification WHERE id_notification = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

