import { Router } from 'express';
import {
  getAllFriendsController,
  getFriendByUserAndFriendIdController,
  getFriendsByUserIdController,
  createFriendController,
  updateFriendController,
  deleteFriendController,
} from '../../controllers/friends/friend.controller';

const router = Router();

/**
 * @swagger
 * /api/friends:
 *   get:
 *     summary: Get all friend relationships
 *     tags: [Friends]
 *     responses:
 *       200:
 *         description: List of all friend relationships
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new friend relationship
 *     tags: [Friends]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fk_id_user
 *               - fk_id_friend
 *             properties:
 *               fk_id_user:
 *                 type: string
 *               fk_id_friend:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Friend relationship created successfully
 *       400:
 *         description: Failed to create friend relationship
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllFriendsController);
router.post('/', createFriendController);

/**
 * @swagger
 * /api/friends/user/{userId}:
 *   get:
 *     summary: Get friends by user ID
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: List of friends for the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getFriendsByUserIdController);

/**
 * @swagger
 * /api/friends/{userId}/{friendId}:
 *   get:
 *     summary: Get friend relationship by user and friend ID
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *         description: Friend ID (UUID)
 *     responses:
 *       200:
 *         description: Friend relationship details
 *       400:
 *         description: Invalid user ID or friend ID
 *       404:
 *         description: Friend relationship not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update friend relationship
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *         description: Friend ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend relationship updated successfully
 *       400:
 *         description: Invalid user ID or friend ID
 *       404:
 *         description: Friend relationship not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete friend relationship
 *     tags: [Friends]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *         description: Friend ID (UUID)
 *     responses:
 *       200:
 *         description: Friend relationship deleted successfully
 *       400:
 *         description: Invalid user ID or friend ID
 *       404:
 *         description: Friend relationship not found
 *       500:
 *         description: Internal server error
 */
router.get('/:userId/:friendId', getFriendByUserAndFriendIdController);
router.patch('/:userId/:friendId', updateFriendController);
router.delete('/:userId/:friendId', deleteFriendController);

export default router;

