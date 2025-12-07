import pool from '../../db/config';
import { UserNotification } from '../../types/notifications/userNotificationInterface';

export const getAllUserNotifications = async (): Promise<UserNotification[]> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_user, fk_id_notification, is_read FROM user_notification'
  );
  const userNotifications = rows as Array<{ is_read: number | boolean } & Omit<UserNotification, 'is_read'>>;
  return userNotifications.map(un => ({
    ...un,
    is_read: Boolean(un.is_read),
  })) as UserNotification[];
};

export const getUserNotificationByUserAndNotificationId = async (userId: string, notificationId: string): Promise<UserNotification | null> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_user, fk_id_notification, is_read FROM user_notification WHERE fk_id_user = ? AND fk_id_notification = ?',
    [userId, notificationId]
  );
  const userNotification = (rows as Array<{ is_read: number | boolean } & Omit<UserNotification, 'is_read'>>)[0];
  if (!userNotification) return null;
  return {
    ...userNotification,
    is_read: Boolean(userNotification.is_read),
  } as UserNotification;
};

export const getUserNotificationsByUserId = async (userId: string): Promise<UserNotification[]> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_user, fk_id_notification, is_read FROM user_notification WHERE fk_id_user = ?',
    [userId]
  );
  const userNotifications = rows as Array<{ is_read: number | boolean } & Omit<UserNotification, 'is_read'>>;
  return userNotifications.map(un => ({
    ...un,
    is_read: Boolean(un.is_read),
  })) as UserNotification[];
};

export const createUserNotification = async (userNotificationData: UserNotification): Promise<boolean> => {
  const [result] = await pool.execute(
    'INSERT INTO user_notification (fk_id_user, fk_id_notification, is_read) VALUES (?, ?, ?)',
    [userNotificationData.fk_id_user, userNotificationData.fk_id_notification, userNotificationData.is_read ? 1 : 0]
  ) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

export const updateUserNotification = async (userId: string, notificationId: string, userNotificationData: Partial<Omit<UserNotification, 'fk_id_user' | 'fk_id_notification'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (userNotificationData.is_read !== undefined) {
    fields.push('is_read = ?');
    values.push(userNotificationData.is_read ? 1 : 0);
  }

  if (fields.length === 0) return false;

  values.push(userId, notificationId);
  const [result] = await pool.execute(
    `UPDATE user_notification SET ${fields.join(', ')} WHERE fk_id_user = ? AND fk_id_notification = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteUserNotification = async (userId: string, notificationId: string): Promise<boolean> => {
  const [result] = await pool.execute(
    'DELETE FROM user_notification WHERE fk_id_user = ? AND fk_id_notification = ?',
    [userId, notificationId]
  ) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

