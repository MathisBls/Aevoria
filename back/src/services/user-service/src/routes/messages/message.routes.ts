import { Router } from 'express';
import {
  getAllMessagesController,
  getMessageByIdController,
  getMessagesByUserIdController,
  createMessageController,
  updateMessageController,
  deleteMessageController,
} from '../../controllers/messages/message.controller';

const router = Router();

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: List of all messages
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message_type
 *             properties:
 *               content:
 *                 type: string
 *               message_type:
 *                 type: string
 *               fk_id_user_send:
 *                 type: string
 *               fk_id_user_received:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllMessagesController);
router.post('/', createMessageController);

/**
 * @swagger
 * /api/messages/user/{userId}:
 *   get:
 *     summary: Get messages by user ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: List of messages for the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getMessagesByUserIdController);

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Get message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID (UUID)
 *     responses:
 *       200:
 *         description: Message details
 *       400:
 *         description: Invalid message ID
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               message_type:
 *                 type: string
 *               fk_id_user_send:
 *                 type: string
 *               fk_id_user_received:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message updated successfully
 *       400:
 *         description: Invalid message ID
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete message by ID
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID (UUID)
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       400:
 *         description: Invalid message ID
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getMessageByIdController);
router.patch('/:id', updateMessageController);
router.delete('/:id', deleteMessageController);

export default router;

