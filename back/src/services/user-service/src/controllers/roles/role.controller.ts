import type { Request, Response } from 'express';
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from '../../services/roles/role.service';

export const getAllRolesController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const roles = await getAllRoles();
    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getRoleByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid role ID' });
      return;
    }
    const role = await getRoleById(id);
    if (!role) {
      res.status(404).json({ success: false, error: 'Role not found' });
      return;
    }
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    console.error('Error fetching role:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createRoleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const roleData = req.body;
    const id = await createRole(roleData);
    res.status(201).json({
      success: true,
      data: { id_role: id },
      message: 'Role created successfully',
    });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateRoleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const roleData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid role ID' });
      return;
    }
    const updated = await updateRole(id, roleData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Role not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Role updated successfully' });
  } catch (error) {
    console.error('Error updating role:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteRoleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid role ID' });
      return;
    }
    const deleted = await deleteRole(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Role not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

