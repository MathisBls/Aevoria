import { Router } from 'express';
import {
  getAllRolesController,
  getRoleByIdController,
  createRoleController,
  updateRoleController,
  deleteRoleController,
} from '../../controllers/roles/role.controller';

const router = Router();

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of all roles
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
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
 *     responses:
 *       201:
 *         description: Role created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllRolesController);
router.post('/', createRoleController);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID (UUID)
 *     responses:
 *       200:
 *         description: Role details
 *       400:
 *         description: Invalid role ID
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Invalid role ID
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID (UUID)
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       400:
 *         description: Invalid role ID
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getRoleByIdController);
router.patch('/:id', updateRoleController);
router.delete('/:id', deleteRoleController);

export default router;

