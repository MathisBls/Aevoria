import { Router } from 'express';
import {
  getAllGenresController,
  getGenreByIdController,
  createGenreController,
  updateGenreController,
  deleteGenreController,
} from '../../controllers/genres/genre.controller';

const router = Router();

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Get all genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: List of all genres
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Genre created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllGenresController);
router.post('/', createGenreController);

/**
 * @swagger
 * /api/genres/{id}:
 *   get:
 *     summary: Get genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Genre ID (UUID)
 *     responses:
 *       200:
 *         description: Genre details
 *       400:
 *         description: Invalid genre ID
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Genre ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Genre updated successfully
 *       400:
 *         description: Invalid genre ID
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete genre by ID
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Genre ID (UUID)
 *     responses:
 *       200:
 *         description: Genre deleted successfully
 *       400:
 *         description: Invalid genre ID
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getGenreByIdController);
router.patch('/:id', updateGenreController);
router.delete('/:id', deleteGenreController);

export default router;

