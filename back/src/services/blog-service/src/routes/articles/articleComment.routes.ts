import { Router } from 'express';
import {
  getAllArticleCommentsController,
  getArticleCommentByIdController,
  createArticleCommentController,
  updateArticleCommentController,
  deleteArticleCommentController,
} from '../../controllers/articles/articleComment.controller';

const router = Router();

/**
 * @swagger
 * /api/article-comments:
 *   get:
 *     summary: Get all article comments
 *     tags: [Article Comments]
 *     responses:
 *       200:
 *         description: List of all article comments
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new article comment
 *     tags: [Article Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment_text
 *               - fk_id_articles
 *             properties:
 *               comment_text:
 *                 type: string
 *               fk_id_articles:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article comment created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllArticleCommentsController);
router.post('/', createArticleCommentController);

/**
 * @swagger
 * /api/article-comments/{id}:
 *   get:
 *     summary: Get article comment by ID
 *     tags: [Article Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article comment ID (UUID)
 *     responses:
 *       200:
 *         description: Article comment details
 *       400:
 *         description: Invalid comment ID
 *       404:
 *         description: Article comment not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update article comment by ID
 *     tags: [Article Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article comment ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment_text:
 *                 type: string
 *               fk_id_articles:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article comment updated successfully
 *       400:
 *         description: Invalid comment ID
 *       404:
 *         description: Article comment not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete article comment by ID
 *     tags: [Article Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article comment ID (UUID)
 *     responses:
 *       200:
 *         description: Article comment deleted successfully
 *       400:
 *         description: Invalid comment ID
 *       404:
 *         description: Article comment not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getArticleCommentByIdController);
router.patch('/:id', updateArticleCommentController);
router.delete('/:id', deleteArticleCommentController);

export default router;

