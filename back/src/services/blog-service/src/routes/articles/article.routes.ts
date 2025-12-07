import { Router } from 'express';
import {
  getAllArticlesController,
  getArticleByIdController,
  createArticleController,
  updateArticleController,
  deleteArticleController,
} from '../../controllers/articles/article.controller';

const router = Router();

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: List of all articles
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image_url:
 *                 type: string
 *               fk_id_author:
 *                 type: string
 *               fk_id_category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllArticlesController);
router.post('/', createArticleController);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID (UUID)
 *     responses:
 *       200:
 *         description: Article details
 *       400:
 *         description: Invalid article ID
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image_url:
 *                 type: string
 *               fk_id_author:
 *                 type: string
 *               fk_id_category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       400:
 *         description: Invalid article ID
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article ID (UUID)
 *     responses:
 *       200:
 *         description: Article deleted successfully
 *       400:
 *         description: Invalid article ID
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getArticleByIdController);
router.patch('/:id', updateArticleController);
router.delete('/:id', deleteArticleController);

export default router;

