import {
  getAllNotifications as getAllNotificationsModel,
  getNotificationById as getNotificationByIdModel,
  createNotification as createNotificationModel,
  updateNotification as updateNotificationModel,
  deleteNotification as deleteNotificationModel,
} from '../../models/notifications/notification.model';
import type { Notification } from '../../types/notifications/notificationInterface';

export const getAllNotifications = async (): Promise<Notification[]> => {
  return await getAllNotificationsModel();
};

export const getNotificationById = async (id: string): Promise<Notification | null> => {
  return await getNotificationByIdModel(id);
};

export const createNotification = async (notificationData: Omit<Notification, 'id_notification' | 'created_at'>): Promise<string> => {
  return await createNotificationModel(notificationData);
};

export const updateNotification = async (id: string, notificationData: Partial<Omit<Notification, 'id_notification' | 'created_at'>>): Promise<boolean> => {
  return await updateNotificationModel(id, notificationData);
};

export const deleteNotification = async (id: string): Promise<boolean> => {
  return await deleteNotificationModel(id);
};

