import { Router } from 'express';
import {
  getAllCartItemsController,
  getCartItemByIdController,
  getCartItemsByCartIdController,
  createCartItemController,
  updateCartItemController,
  deleteCartItemController,
} from '../../controllers/cart/cartItem.controller';

const router = Router();

/**
 * @swagger
 * /api/cart-items:
 *   get:
 *     summary: Get all cart items
 *     tags: [CartItems]
 *     responses:
 *       200:
 *         description: List of all cart items
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new cart item
 *     tags: [CartItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *               fk_id_cart:
 *                 type: string
 *               fk_id_games:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cart item created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllCartItemsController);
router.post('/', createCartItemController);

/**
 * @swagger
 * /api/cart-items/cart/{cartId}:
 *   get:
 *     summary: Get cart items by cart ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID (UUID)
 *     responses:
 *       200:
 *         description: List of cart items for the cart
 *       400:
 *         description: Invalid cart ID
 *       500:
 *         description: Internal server error
 */
router.get('/cart/:cartId', getCartItemsByCartIdController);

/**
 * @swagger
 * /api/cart-items/{id}:
 *   get:
 *     summary: Get cart item by ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID (UUID)
 *     responses:
 *       200:
 *         description: Cart item details
 *       400:
 *         description: Invalid cart item ID
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update cart item by ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *               fk_id_cart:
 *                 type: string
 *               fk_id_games:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Invalid cart item ID
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete cart item by ID
 *     tags: [CartItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID (UUID)
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *       400:
 *         description: Invalid cart item ID
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getCartItemByIdController);
router.patch('/:id', updateCartItemController);
router.delete('/:id', deleteCartItemController);

export default router;

