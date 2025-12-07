import { Router } from 'express';
import {
  getAllArticleCategoriesController,
  getArticleCategoryByIdController,
  createArticleCategoryController,
  updateArticleCategoryController,
  deleteArticleCategoryController,
} from '../../controllers/articles/articleCategory.controller';

const router = Router();

/**
 * @swagger
 * /api/article-categories:
 *   get:
 *     summary: Get all article categories
 *     tags: [Article Categories]
 *     responses:
 *       200:
 *         description: List of all article categories
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new article category
 *     tags: [Article Categories]
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
 *         description: Article category created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllArticleCategoriesController);
router.post('/', createArticleCategoryController);

/**
 * @swagger
 * /api/article-categories/{id}:
 *   get:
 *     summary: Get article category by ID
 *     tags: [Article Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article category ID (UUID)
 *     responses:
 *       200:
 *         description: Article category details
 *       400:
 *         description: Invalid category ID
 *       404:
 *         description: Article category not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update article category by ID
 *     tags: [Article Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article category ID (UUID)
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
 *         description: Article category updated successfully
 *       400:
 *         description: Invalid category ID
 *       404:
 *         description: Article category not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete article category by ID
 *     tags: [Article Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Article category ID (UUID)
 *     responses:
 *       200:
 *         description: Article category deleted successfully
 *       400:
 *         description: Invalid category ID
 *       404:
 *         description: Article category not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getArticleCategoryByIdController);
router.patch('/:id', updateArticleCategoryController);
router.delete('/:id', deleteArticleCategoryController);

export default router;

