import { Router } from 'express';
import {
  getAllGameGenresController,
  getGameGenreByGameAndGenreIdController,
  getGameGenresByGameIdController,
  createGameGenreController,
  deleteGameGenreController,
} from '../../controllers/genres/gameGenre.controller';

const router = Router();

/**
 * @swagger
 * /api/game-genres:
 *   get:
 *     summary: Get all game genres
 *     tags: [GameGenres]
 *     responses:
 *       200:
 *         description: List of all game genres
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new game genre
 *     tags: [GameGenres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fk_id_games
 *               - fk_id_genre
 *             properties:
 *               fk_id_games:
 *                 type: string
 *               fk_id_genre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game genre created successfully
 *       400:
 *         description: Failed to create game genre
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllGameGenresController);
router.post('/', createGameGenreController);

/**
 * @swagger
 * /api/game-genres/game/{gameId}:
 *   get:
 *     summary: Get game genres by game ID
 *     tags: [GameGenres]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *     responses:
 *       200:
 *         description: List of game genres for the game
 *       400:
 *         description: Invalid game ID
 *       500:
 *         description: Internal server error
 */
router.get('/game/:gameId', getGameGenresByGameIdController);

/**
 * @swagger
 * /api/game-genres/{gameId}/{genreId}:
 *   get:
 *     summary: Get game genre by game and genre ID
 *     tags: [GameGenres]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *       - in: path
 *         name: genreId
 *         required: true
 *         schema:
 *           type: string
 *         description: Genre ID (UUID)
 *     responses:
 *       200:
 *         description: Game genre details
 *       400:
 *         description: Invalid game ID or genre ID
 *       404:
 *         description: Game genre not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete game genre
 *     tags: [GameGenres]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *       - in: path
 *         name: genreId
 *         required: true
 *         schema:
 *           type: string
 *         description: Genre ID (UUID)
 *     responses:
 *       200:
 *         description: Game genre deleted successfully
 *       400:
 *         description: Invalid game ID or genre ID
 *       404:
 *         description: Game genre not found
 *       500:
 *         description: Internal server error
 */
router.get('/:gameId/:genreId', getGameGenreByGameAndGenreIdController);
router.delete('/:gameId/:genreId', deleteGameGenreController);

export default router;

