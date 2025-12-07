import type { Request, Response } from 'express';
import {
  getAllUserNotifications,
  getUserNotificationByUserAndNotificationId,
  getUserNotificationsByUserId,
  createUserNotification,
  updateUserNotification,
  deleteUserNotification,
} from '../../services/notifications/userNotification.service';

export const getAllUserNotificationsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const userNotifications = await getAllUserNotifications();
    res.status(200).json({ success: true, data: userNotifications });
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getUserNotificationByUserAndNotificationIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const notificationId = req.params.notificationId;
    if (!userId || !notificationId) {
      res.status(400).json({ success: false, error: 'Invalid user ID or notification ID' });
      return;
    }
    const userNotification = await getUserNotificationByUserAndNotificationId(userId, notificationId);
    if (!userNotification) {
      res.status(404).json({ success: false, error: 'User notification not found' });
      return;
    }
    res.status(200).json({ success: true, data: userNotification });
  } catch (error) {
    console.error('Error fetching user notification:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getUserNotificationsByUserIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID' });
      return;
    }
    const userNotifications = await getUserNotificationsByUserId(userId);
    res.status(200).json({ success: true, data: userNotifications });
  } catch (error) {
    console.error('Error fetching user notifications by user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createUserNotificationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userNotificationData = req.body;
    const created = await createUserNotification(userNotificationData);
    if (!created) {
      res.status(400).json({ success: false, error: 'Failed to create user notification' });
      return;
    }
    res.status(201).json({ success: true, message: 'User notification created successfully' });
  } catch (error) {
    console.error('Error creating user notification:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateUserNotificationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const notificationId = req.params.notificationId;
    const userNotificationData = req.body;
    if (!userId || !notificationId) {
      res.status(400).json({ success: false, error: 'Invalid user ID or notification ID' });
      return;
    }
    const updated = await updateUserNotification(userId, notificationId, userNotificationData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'User notification not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'User notification updated successfully' });
  } catch (error) {
    console.error('Error updating user notification:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteUserNotificationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const notificationId = req.params.notificationId;
    if (!userId || !notificationId) {
      res.status(400).json({ success: false, error: 'Invalid user ID or notification ID' });
      return;
    }
    const deleted = await deleteUserNotification(userId, notificationId);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'User notification not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'User notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting user notification:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

