import { Router } from 'express';
import {
  getAllOrdersController,
  getOrderByIdController,
  getOrdersByUserIdController,
  createOrderController,
  updateOrderController,
  deleteOrderController,
} from '../../controllers/orders/order.controller';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - total_price
 *               - payment_method
 *             properties:
 *               total_price:
 *                 type: number
 *               status:
 *                 type: string
 *               payment_method:
 *                 type: string
 *               currency:
 *                 type: string
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllOrdersController);
router.post('/', createOrderController);

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: Get orders by user ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: List of orders for the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getOrdersByUserIdController);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID (UUID)
 *     responses:
 *       200:
 *         description: Order details
 *       400:
 *         description: Invalid order ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               total_price:
 *                 type: number
 *               status:
 *                 type: string
 *               payment_method:
 *                 type: string
 *               currency:
 *                 type: string
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Invalid order ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID (UUID)
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Invalid order ID
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getOrderByIdController);
router.patch('/:id', updateOrderController);
router.delete('/:id', deleteOrderController);

export default router;

