import { Router } from 'express';
import {
  getAllGameMediasController,
  getGameMediaByIdController,
  getGameMediasByGameIdController,
  createGameMediaController,
  updateGameMediaController,
  deleteGameMediaController,
} from '../../controllers/games/gameMedia.controller';

const router = Router();

/**
 * @swagger
 * /api/game-medias:
 *   get:
 *     summary: Get all game medias
 *     tags: [GameMedias]
 *     responses:
 *       200:
 *         description: List of all game medias
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new game media
 *     tags: [GameMedias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - media_url
 *             properties:
 *               media_type:
 *                 type: string
 *               media_url:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *               fk_id_games:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game media created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllGameMediasController);
router.post('/', createGameMediaController);

/**
 * @swagger
 * /api/game-medias/game/{gameId}:
 *   get:
 *     summary: Get game medias by game ID
 *     tags: [GameMedias]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *     responses:
 *       200:
 *         description: List of game medias for the game
 *       400:
 *         description: Invalid game ID
 *       500:
 *         description: Internal server error
 */
router.get('/game/:gameId', getGameMediasByGameIdController);

/**
 * @swagger
 * /api/game-medias/{id}:
 *   get:
 *     summary: Get game media by ID
 *     tags: [GameMedias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game media ID (UUID)
 *     responses:
 *       200:
 *         description: Game media details
 *       400:
 *         description: Invalid game media ID
 *       404:
 *         description: Game media not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update game media by ID
 *     tags: [GameMedias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game media ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               media_type:
 *                 type: string
 *               media_url:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *               fk_id_games:
 *                 type: string
 *     responses:
 *       200:
 *         description: Game media updated successfully
 *       400:
 *         description: Invalid game media ID
 *       404:
 *         description: Game media not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete game media by ID
 *     tags: [GameMedias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Game media ID (UUID)
 *     responses:
 *       200:
 *         description: Game media deleted successfully
 *       400:
 *         description: Invalid game media ID
 *       404:
 *         description: Game media not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getGameMediaByIdController);
router.patch('/:id', updateGameMediaController);
router.delete('/:id', deleteGameMediaController);

export default router;

