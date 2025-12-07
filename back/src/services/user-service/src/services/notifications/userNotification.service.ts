import {
  getAllUserNotifications as getAllUserNotificationsModel,
  getUserNotificationByUserAndNotificationId as getUserNotificationByUserAndNotificationIdModel,
  getUserNotificationsByUserId as getUserNotificationsByUserIdModel,
  createUserNotification as createUserNotificationModel,
  updateUserNotification as updateUserNotificationModel,
  deleteUserNotification as deleteUserNotificationModel,
} from '../../models/notifications/userNotification.model';
import type { UserNotification } from '../../types/notifications/userNotificationInterface';

export const getAllUserNotifications = async (): Promise<UserNotification[]> => {
  return await getAllUserNotificationsModel();
};

export const getUserNotificationByUserAndNotificationId = async (userId: string, notificationId: string): Promise<UserNotification | null> => {
  return await getUserNotificationByUserAndNotificationIdModel(userId, notificationId);
};

export const getUserNotificationsByUserId = async (userId: string): Promise<UserNotification[]> => {
  return await getUserNotificationsByUserIdModel(userId);
};

export const createUserNotification = async (userNotificationData: UserNotification): Promise<boolean> => {
  return await createUserNotificationModel(userNotificationData);
};

export const updateUserNotification = async (userId: string, notificationId: string, userNotificationData: Partial<Omit<UserNotification, 'fk_id_user' | 'fk_id_notification'>>): Promise<boolean> => {
  return await updateUserNotificationModel(userId, notificationId, userNotificationData);
};

export const deleteUserNotification = async (userId: string, notificationId: string): Promise<boolean> => {
  return await deleteUserNotificationModel(userId, notificationId);
};

