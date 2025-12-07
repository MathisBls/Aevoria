import { Router } from 'express';
import {
  getAllUserArticleCommentsController,
  getUserArticleCommentByIdController,
  createUserArticleCommentController,
  deleteUserArticleCommentController,
} from '../../controllers/articles/userArticleComment.controller';

const router = Router();

/**
 * @swagger
 * /api/user-article-comments:
 *   get:
 *     summary: Get all user article comments
 *     tags: [User Article Comments]
 *     responses:
 *       200:
 *         description: List of all user article comments
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new user article comment
 *     tags: [User Article Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fk_id_user
 *               - fk_id_article_comments
 *             properties:
 *               fk_id_user:
 *                 type: string
 *               fk_id_article_comments:
 *                 type: string
 *     responses:
 *       201:
 *         description: User article comment created successfully
 *       400:
 *         description: Failed to create user article comment
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllUserArticleCommentsController);
router.post('/', createUserArticleCommentController);

/**
 * @swagger
 * /api/user-article-comments/{userId}/{commentId}:
 *   get:
 *     summary: Get user article comment by user ID and comment ID
 *     tags: [User Article Comments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Article comment ID (UUID)
 *     responses:
 *       200:
 *         description: User article comment details
 *       400:
 *         description: Invalid user ID or comment ID
 *       404:
 *         description: User article comment not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete user article comment by user ID and comment ID
 *     tags: [User Article Comments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Article comment ID (UUID)
 *     responses:
 *       200:
 *         description: User article comment deleted successfully
 *       400:
 *         description: Invalid user ID or comment ID
 *       404:
 *         description: User article comment not found
 *       500:
 *         description: Internal server error
 */
router.get('/:userId/:commentId', getUserArticleCommentByIdController);
router.delete('/:userId/:commentId', deleteUserArticleCommentController);

export default router;

