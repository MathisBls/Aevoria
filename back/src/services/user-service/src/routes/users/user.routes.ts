import { Router } from 'express';
import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
} from '../../controllers/users/user.controller';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - username
 *               - email
 *               - password_hash
 *               - password_salt
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password_hash:
 *                 type: string
 *               password_salt:
 *                 type: string
 *               subscription_type:
 *                 type: string
 *               wallet_balance:
 *                 type: number
 *               language_preference:
 *                 type: string
 *               provider:
 *                 type: string
 *               fk_id_role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllUsersController);
router.post('/', createUserController);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: User details
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password_hash:
 *                 type: string
 *               password_salt:
 *                 type: string
 *               subscription_type:
 *                 type: string
 *               wallet_balance:
 *                 type: number
 *               language_preference:
 *                 type: string
 *               provider:
 *                 type: string
 *               fk_id_role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getUserByIdController);
router.patch('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
