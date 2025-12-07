import { Router } from 'express';
import {
  getAllGameTagsController,
  getGameTagByGameAndTagIdController,
  getGameTagsByGameIdController,
  createGameTagController,
  deleteGameTagController,
} from '../../controllers/games/gameTag.controller';

const router = Router();

/**
 * @swagger
 * /api/game-tags:
 *   get:
 *     summary: Get all game tags
 *     tags: [GameTags]
 *     responses:
 *       200:
 *         description: List of all game tags
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new game tag
 *     tags: [GameTags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fk_id_games
 *               - fk_id_tags
 *             properties:
 *               fk_id_games:
 *                 type: string
 *               fk_id_tags:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game tag created successfully
 *       400:
 *         description: Failed to create game tag
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllGameTagsController);
router.post('/', createGameTagController);

/**
 * @swagger
 * /api/game-tags/game/{gameId}:
 *   get:
 *     summary: Get game tags by game ID
 *     tags: [GameTags]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *     responses:
 *       200:
 *         description: List of game tags for the game
 *       400:
 *         description: Invalid game ID
 *       500:
 *         description: Internal server error
 */
router.get('/game/:gameId', getGameTagsByGameIdController);

/**
 * @swagger
 * /api/game-tags/{gameId}/{tagId}:
 *   get:
 *     summary: Get game tag by game and tag ID
 *     tags: [GameTags]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag ID (UUID)
 *     responses:
 *       200:
 *         description: Game tag details
 *       400:
 *         description: Invalid game ID or tag ID
 *       404:
 *         description: Game tag not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete game tag
 *     tags: [GameTags]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *         description: Game ID (UUID)
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag ID (UUID)
 *     responses:
 *       200:
 *         description: Game tag deleted successfully
 *       400:
 *         description: Invalid game ID or tag ID
 *       404:
 *         description: Game tag not found
 *       500:
 *         description: Internal server error
 */
router.get('/:gameId/:tagId', getGameTagByGameAndTagIdController);
router.delete('/:gameId/:tagId', deleteGameTagController);

export default router;

