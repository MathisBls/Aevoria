import type { Request, Response } from 'express';
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../../services/notifications/notification.service';

export const getAllNotificationsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await getAllNotifications();
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getNotificationByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid notification ID' });
      return;
    }
    const notification = await getNotificationById(id);
    if (!notification) {
      res.status(404).json({ success: false, error: 'Notification not found' });
      return;
    }
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    console.error('Error fetching notification:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createNotificationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const notificationData = req.body;
    const id = await createNotification(notificationData);
    res.status(201).json({
      success: true,
      data: { id_notification: id },
      message: 'Notification created successfully',
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateNotificationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const notificationData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid notification ID' });
      return;
    }
    const updated = await updateNotification(id, notificationData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Notification not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Notification updated successfully' });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteNotificationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid notification ID' });
      return;
    }
    const deleted = await deleteNotification(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Notification not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

