import { Router } from 'express';
import {
  getAllWishlistsController,
  getWishlistByIdController,
  getWishlistsByUserIdController,
  getWishlistByUserAndGameIdController,
  createWishlistController,
  deleteWishlistController,
  deleteWishlistByUserAndGameIdController,
} from '../../controllers/wishlist/wishlist.controller';

const router = Router();

/**
 * @swagger
 * /api/wishlists:
 *   get:
 *     summary: Get all wishlists
 *     tags: [Wishlists]
 *     responses:
 *       200:
 *         description: List of all wishlists
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new wishlist
 *     tags: [Wishlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_id_user:
 *                 type: string
 *               fk_id_games:
 *                 type: string
 *     responses:
 *       201:
 *         description: Wishlist created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllWishlistsController);
router.post('/', createWishlistController);

/**
 * @swagger
 * /api/wishlists/user/{userId}:
 *   get:
 *     summary: Get wishlists by user ID
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: List of wishlists for the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getWishlistsByUserIdController);

/**
 * @swagger
 * /api/wishlists/{id}:
 *   get:
 *     summary: Get wishlist by ID
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wishlist ID (UUID)
 *     responses:
 *       200:
 *         description: Wishlist details
 *       400:
 *         description: Invalid wishlist ID
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete wishlist by ID
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wishlist ID (UUID)
 *     responses:
 *       200:
 *         description: Wishlist deleted successfully
 *       400:
 *         description: Invalid wishlist ID
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getWishlistByIdController);
router.delete('/:id', deleteWishlistController);

/**
 * @swagger
 * /api/wishlists/{userId}/{gameId}:
 *   get:
 *     summary: Get wishlist by user and game ID
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *     responses:
 *       200:
 *         description: Wishlist details
 *       400:
 *         description: Invalid user ID or game ID
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete wishlist by user and game ID
 *     tags: [Wishlists]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *     responses:
 *       200:
 *         description: Wishlist deleted successfully
 *       400:
 *         description: Invalid user ID or game ID
 *       404:
 *         description: Wishlist not found
 *       500:
 *         description: Internal server error
 */
router.get('/:userId/:gameId', getWishlistByUserAndGameIdController);
router.delete('/:userId/:gameId', deleteWishlistByUserAndGameIdController);

export default router;

