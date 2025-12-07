import { Router } from 'express';
import {
  getAllGamesController,
  getGameByIdController,
  createGameController,
  updateGameController,
  deleteGameController,
} from '../../controllers/games/game.controller';

const router = Router();

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: List of all games
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - price
 *               - release_date
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               banner_url:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *               release_date:
 *                 type: string
 *                 format: date-time
 *               installation_notes:
 *                 type: string
 *               ratings:
 *                 type: number
 *               reviews_count:
 *                 type: number
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllGamesController);
router.post('/', createGameController);

/**
 * @swagger
 * /api/games/{id}:
 *   get:
 *     summary: Get game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *     responses:
 *       200:
 *         description: Game details
 *       400:
 *         description: Invalid game ID
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               banner_url:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *               release_date:
 *                 type: string
 *                 format: date-time
 *               installation_notes:
 *                 type: string
 *               ratings:
 *                 type: number
 *               reviews_count:
 *                 type: number
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Game updated successfully
 *       400:
 *         description: Invalid game ID
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete game by ID
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *     responses:
 *       200:
 *         description: Game deleted successfully
 *       400:
 *         description: Invalid game ID
 *       404:
 *         description: Game not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getGameByIdController);
router.patch('/:id', updateGameController);
router.delete('/:id', deleteGameController);

export default router;

