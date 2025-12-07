import { Router } from 'express';
import {
  getAllOrderItemsController,
  getOrderItemByIdController,
  getOrderItemsByOrderIdController,
  createOrderItemController,
  updateOrderItemController,
  deleteOrderItemController,
} from '../../controllers/orders/orderItem.controller';

const router = Router();

/**
 * @swagger
 * /api/order-items:
 *   get:
 *     summary: Get all order items
 *     tags: [OrderItems]
 *     responses:
 *       200:
 *         description: List of all order items
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new order item
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *               - price
 *             properties:
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               fk_id_order:
 *                 type: string
 *               fk_id_games:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order item created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllOrderItemsController);
router.post('/', createOrderItemController);

/**
 * @swagger
 * /api/order-items/order/{orderId}:
 *   get:
 *     summary: Get order items by order ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID (UUID)
 *     responses:
 *       200:
 *         description: List of order items for the order
 *       400:
 *         description: Invalid order ID
 *       500:
 *         description: Internal server error
 */
router.get('/order/:orderId', getOrderItemsByOrderIdController);

/**
 * @swagger
 * /api/order-items/{id}:
 *   get:
 *     summary: Get order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order item ID (UUID)
 *     responses:
 *       200:
 *         description: Order item details
 *       400:
 *         description: Invalid order item ID
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order item ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               fk_id_order:
 *                 type: string
 *               fk_id_games:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *       400:
 *         description: Invalid order item ID
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete order item by ID
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order item ID (UUID)
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *       400:
 *         description: Invalid order item ID
 *       404:
 *         description: Order item not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getOrderItemByIdController);
router.patch('/:id', updateOrderItemController);
router.delete('/:id', deleteOrderItemController);

export default router;

