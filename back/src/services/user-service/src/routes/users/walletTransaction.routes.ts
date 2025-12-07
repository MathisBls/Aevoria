import { Router } from 'express';
import {
  getAllWalletTransactionsController,
  getWalletTransactionByIdController,
  getWalletTransactionsByUserIdController,
  createWalletTransactionController,
  updateWalletTransactionController,
  deleteWalletTransactionController,
} from '../../controllers/users/walletTransaction.controller';

const router = Router();

/**
 * @swagger
 * /api/wallet-transactions:
 *   get:
 *     summary: Get all wallet transactions
 *     tags: [WalletTransactions]
 *     responses:
 *       200:
 *         description: List of all wallet transactions
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new wallet transaction
 *     tags: [WalletTransactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type_transaction
 *             properties:
 *               amount:
 *                 type: number
 *               type_transaction:
 *                 type: string
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllWalletTransactionsController);
router.post('/', createWalletTransactionController);

/**
 * @swagger
 * /api/wallet-transactions/user/{userId}:
 *   get:
 *     summary: Get wallet transactions by user ID
 *     tags: [WalletTransactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: List of transactions for the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getWalletTransactionsByUserIdController);

/**
 * @swagger
 * /api/wallet-transactions/{id}:
 *   get:
 *     summary: Get wallet transaction by ID
 *     tags: [WalletTransactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID (UUID)
 *     responses:
 *       200:
 *         description: Transaction details
 *       400:
 *         description: Invalid transaction ID
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update wallet transaction by ID
 *     tags: [WalletTransactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type_transaction:
 *                 type: string
 *               date_transaction:
 *                 type: string
 *                 format: date-time
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       400:
 *         description: Invalid transaction ID
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete wallet transaction by ID
 *     tags: [WalletTransactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID (UUID)
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       400:
 *         description: Invalid transaction ID
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getWalletTransactionByIdController);
router.patch('/:id', updateWalletTransactionController);
router.delete('/:id', deleteWalletTransactionController);

export default router;

