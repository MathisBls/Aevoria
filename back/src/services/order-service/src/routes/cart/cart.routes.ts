import { Router } from 'express';
import {
  getAllCartsController,
  getCartByIdController,
  getCartsByUserIdController,
  createCartController,
  updateCartController,
  deleteCartController,
} from '../../controllers/cart/cart.controller';

const router = Router();

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Get all carts
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: List of all carts
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new cart
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cart created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllCartsController);
router.post('/', createCartController);

/**
 * @swagger
 * /api/carts/user/{userId}:
 *   get:
 *     summary: Get carts by user ID
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: List of carts for the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getCartsByUserIdController);

/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     summary: Get cart by ID
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID (UUID)
 *     responses:
 *       200:
 *         description: Cart details
 *       400:
 *         description: Invalid cart ID
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update cart by ID
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Invalid cart ID
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete cart by ID
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID (UUID)
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       400:
 *         description: Invalid cart ID
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getCartByIdController);
router.patch('/:id', updateCartController);
router.delete('/:id', deleteCartController);

export default router;

