import { Router } from 'express';
import {
  getAllReviewsController,
  getReviewByIdController,
  getReviewsByGameIdController,
  getReviewsByUserIdController,
  createReviewController,
  updateReviewController,
  deleteReviewController,
} from '../../controllers/reviews/review.controller';

const router = Router();

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of all reviews
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               review_text:
 *                 type: string
 *               video_url:
 *                 type: string
 *               fk_id_user:
 *                 type: string
 *               fk_id_games:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllReviewsController);
router.post('/', createReviewController);

/**
 * @swagger
 * /api/reviews/game/{gameId}:
 *   get:
 *     summary: Get reviews by game ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *     responses:
 *       200:
 *         description: List of reviews for the game
 *       400:
 *         description: Invalid game ID
 *       500:
 *         description: Internal server error
 */
router.get('/game/:gameId', getReviewsByGameIdController);

/**
 * @swagger
 * /api/reviews/user/{userId}:
 *   get:
 *     summary: Get reviews by user ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: List of reviews for the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getReviewsByUserIdController);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Get review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID (UUID)
 *     responses:
 *       200:
 *         description: Review details
 *       400:
 *         description: Invalid review ID
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               review_text:
 *                 type: string
 *               video_url:
 *                 type: string
 *               fk_id_user:
 *                 type: string
 *               fk_id_games:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       400:
 *         description: Invalid review ID
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Review ID (UUID)
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       400:
 *         description: Invalid review ID
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getReviewByIdController);
router.patch('/:id', updateReviewController);
router.delete('/:id', deleteReviewController);

export default router;

