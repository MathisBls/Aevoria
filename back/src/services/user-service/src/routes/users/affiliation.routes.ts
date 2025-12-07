import { Router } from 'express';
import {
  getAllAffiliationsController,
  getAffiliationByIdController,
  getAffiliationsByUserIdController,
  createAffiliationController,
  updateAffiliationController,
  deleteAffiliationController,
} from '../../controllers/users/affiliation.controller';

const router = Router();

/**
 * @swagger
 * /api/affiliations:
 *   get:
 *     summary: Get all affiliations
 *     tags: [Affiliations]
 *     responses:
 *       200:
 *         description: List of all affiliations
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new affiliation
 *     tags: [Affiliations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refferal_code
 *             properties:
 *               refferal_code:
 *                 type: string
 *               earning:
 *                 type: number
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Affiliation created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllAffiliationsController);
router.post('/', createAffiliationController);

/**
 * @swagger
 * /api/affiliations/user/{userId}:
 *   get:
 *     summary: Get affiliations by user ID
 *     tags: [Affiliations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: List of affiliations for the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getAffiliationsByUserIdController);

/**
 * @swagger
 * /api/affiliations/{id}:
 *   get:
 *     summary: Get affiliation by ID
 *     tags: [Affiliations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Affiliation ID (UUID)
 *     responses:
 *       200:
 *         description: Affiliation details
 *       400:
 *         description: Invalid affiliation ID
 *       404:
 *         description: Affiliation not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update affiliation by ID
 *     tags: [Affiliations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Affiliation ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refferal_code:
 *                 type: string
 *               earning:
 *                 type: number
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Affiliation updated successfully
 *       400:
 *         description: Invalid affiliation ID
 *       404:
 *         description: Affiliation not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete affiliation by ID
 *     tags: [Affiliations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Affiliation ID (UUID)
 *     responses:
 *       200:
 *         description: Affiliation deleted successfully
 *       400:
 *         description: Invalid affiliation ID
 *       404:
 *         description: Affiliation not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getAffiliationByIdController);
router.patch('/:id', updateAffiliationController);
router.delete('/:id', deleteAffiliationController);

export default router;

