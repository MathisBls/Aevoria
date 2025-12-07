import { Router } from 'express';
import {
  getAllNotificationsController,
  getNotificationByIdController,
  createNotificationController,
  updateNotificationController,
  deleteNotificationController,
} from '../../controllers/notifications/notification.controller';

const router = Router();

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: List of all notifications
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               is_important:
 *                 type: boolean
 *               notification_type:
 *                 type: string
 *               entity_type:
 *                 type: string
 *               attached_file:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllNotificationsController);
router.post('/', createNotificationController);

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Get notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID (UUID)
 *     responses:
 *       200:
 *         description: Notification details
 *       400:
 *         description: Invalid notification ID
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *               is_important:
 *                 type: boolean
 *               notification_type:
 *                 type: string
 *               entity_type:
 *                 type: string
 *               attached_file:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *       400:
 *         description: Invalid notification ID
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID (UUID)
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       400:
 *         description: Invalid notification ID
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getNotificationByIdController);
router.patch('/:id', updateNotificationController);
router.delete('/:id', deleteNotificationController);

export default router;

