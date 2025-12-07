import type { Request, Response } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/users/user.service';

export const getAllUsersController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isConnectionError = errorMessage.includes('ETIMEDOUT') || errorMessage.includes('ECONNREFUSED');
    
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: isConnectionError 
        ? `Database connection failed: ${errorMessage}. Check your .env file in back/src/ and ensure DB_HOST is correct.`
        : errorMessage,
    });
  }
};

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    
    if (!id || id.trim() === '') {
      res.status(400).json({
        success: false,
        error: 'Invalid user ID',
      });
      return;
    }

    const user = await getUserById(id);
    
    if (!user) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = req.body;
    const id = await createUser(userData);
    res.status(201).json({
      success: true,
      data: { id_user: id },
      message: 'User created successfully',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const userData = req.body;
    
    if (!id || id.trim() === '') {
      res.status(400).json({
        success: false,
        error: 'Invalid user ID',
      });
      return;
    }

    const updated = await updateUser(id, userData);
    
    if (!updated) {
      res.status(404).json({
        success: false,
        error: 'User not found or no changes made',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    
    if (!id || id.trim() === '') {
      res.status(400).json({
        success: false,
        error: 'Invalid user ID',
      });
      return;
    }

    const deleted = await deleteUser(id);
    
    if (!deleted) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
