import { Router } from 'express';
import {
  getAllTagsController,
  getTagByIdController,
  createTagController,
  updateTagController,
  deleteTagController,
} from '../../controllers/tags/tag.controller';

const router = Router();

/**
 * @swagger
 * /api/tags:
 *   get:
 *     summary: Get all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: List of all tags
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
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
 *         description: Tag created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllTagsController);
router.post('/', createTagController);

/**
 * @swagger
 * /api/tags/{id}:
 *   get:
 *     summary: Get tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag ID (UUID)
 *     responses:
 *       200:
 *         description: Tag details
 *       400:
 *         description: Invalid tag ID
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag ID (UUID)
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
 *         description: Tag updated successfully
 *       400:
 *         description: Invalid tag ID
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete tag by ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag ID (UUID)
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       400:
 *         description: Invalid tag ID
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getTagByIdController);
router.patch('/:id', updateTagController);
router.delete('/:id', deleteTagController);

export default router;

