import { Router } from 'express';
import {
  getAllFriendAliasesController,
  getFriendAliasByIdController,
  getFriendAliasesByUserIdController,
  createFriendAliasController,
  updateFriendAliasController,
  deleteFriendAliasController,
} from '../../controllers/friends/friendAlias.controller';

const router = Router();

/**
 * @swagger
 * /api/friend-aliases:
 *   get:
 *     summary: Get all friend aliases
 *     tags: [FriendAliases]
 *     responses:
 *       200:
 *         description: List of all friend aliases
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new friend alias
 *     tags: [FriendAliases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - custom_name
 *             properties:
 *               custom_name:
 *                 type: string
 *               fk_id_user:
 *                 type: string
 *               fk_id_friend:
 *                 type: string
 *     responses:
 *       201:
 *         description: Friend alias created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllFriendAliasesController);
router.post('/', createFriendAliasController);

/**
 * @swagger
 * /api/friend-aliases/user/{userId}:
 *   get:
 *     summary: Get friend aliases by user ID
 *     tags: [FriendAliases]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: List of friend aliases for the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getFriendAliasesByUserIdController);

/**
 * @swagger
 * /api/friend-aliases/{id}:
 *   get:
 *     summary: Get friend alias by ID
 *     tags: [FriendAliases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Friend alias ID (UUID)
 *     responses:
 *       200:
 *         description: Friend alias details
 *       400:
 *         description: Invalid alias ID
 *       404:
 *         description: Friend alias not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update friend alias by ID
 *     tags: [FriendAliases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Friend alias ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               custom_name:
 *                 type: string
 *               fk_id_user:
 *                 type: string
 *               fk_id_friend:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend alias updated successfully
 *       400:
 *         description: Invalid alias ID
 *       404:
 *         description: Friend alias not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete friend alias by ID
 *     tags: [FriendAliases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Friend alias ID (UUID)
 *     responses:
 *       200:
 *         description: Friend alias deleted successfully
 *       400:
 *         description: Invalid alias ID
 *       404:
 *         description: Friend alias not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getFriendAliasByIdController);
router.patch('/:id', updateFriendAliasController);
router.delete('/:id', deleteFriendAliasController);

export default router;

