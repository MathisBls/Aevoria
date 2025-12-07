import { Router } from 'express';
import {
  getAllUserNotificationsController,
  getUserNotificationByUserAndNotificationIdController,
  getUserNotificationsByUserIdController,
  createUserNotificationController,
  updateUserNotificationController,
  deleteUserNotificationController,
} from '../../controllers/notifications/userNotification.controller';

const router = Router();

/**
 * @swagger
 * /api/user-notifications:
 *   get:
 *     summary: Get all user notifications
 *     tags: [UserNotifications]
 *     responses:
 *       200:
 *         description: List of all user notifications
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new user notification
 *     tags: [UserNotifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fk_id_user
 *               - fk_id_notification
 *             properties:
 *               fk_id_user:
 *                 type: string
 *               fk_id_notification:
 *                 type: string
 *               is_read:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: User notification created successfully
 *       400:
 *         description: Failed to create user notification
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllUserNotificationsController);
router.post('/', createUserNotificationController);

/**
 * @swagger
 * /api/user-notifications/user/{userId}:
 *   get:
 *     summary: Get user notifications by user ID
 *     tags: [UserNotifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: List of user notifications for the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getUserNotificationsByUserIdController);

/**
 * @swagger
 * /api/user-notifications/{userId}/{notificationId}:
 *   get:
 *     summary: Get user notification by user and notification ID
 *     tags: [UserNotifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID (UUID)
 *     responses:
 *       200:
 *         description: User notification details
 *       400:
 *         description: Invalid user ID or notification ID
 *       404:
 *         description: User notification not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update user notification
 *     tags: [UserNotifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_read:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User notification updated successfully
 *       400:
 *         description: Invalid user ID or notification ID
 *       404:
 *         description: User notification not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete user notification
 *     tags: [UserNotifications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *       - in: path
 *         name: notificationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID (UUID)
 *     responses:
 *       200:
 *         description: User notification deleted successfully
 *       400:
 *         description: Invalid user ID or notification ID
 *       404:
 *         description: User notification not found
 *       500:
 *         description: Internal server error
 */
router.get('/:userId/:notificationId', getUserNotificationByUserAndNotificationIdController);
router.patch('/:userId/:notificationId', updateUserNotificationController);
router.delete('/:userId/:notificationId', deleteUserNotificationController);

export default router;

