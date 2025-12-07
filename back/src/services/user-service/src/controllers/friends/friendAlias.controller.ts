import type { Request, Response } from 'express';
import {
  getAllFriendAliases,
  getFriendAliasById,
  getFriendAliasesByUserId,
  createFriendAlias,
  updateFriendAlias,
  deleteFriendAlias,
} from '../../services/friends/friendAlias.service';

export const getAllFriendAliasesController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const aliases = await getAllFriendAliases();
    res.status(200).json({ success: true, data: aliases });
  } catch (error) {
    console.error('Error fetching friend aliases:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getFriendAliasByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid alias ID' });
      return;
    }
    const alias = await getFriendAliasById(id);
    if (!alias) {
      res.status(404).json({ success: false, error: 'Friend alias not found' });
      return;
    }
    res.status(200).json({ success: true, data: alias });
  } catch (error) {
    console.error('Error fetching friend alias:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getFriendAliasesByUserIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID' });
      return;
    }
    const aliases = await getFriendAliasesByUserId(userId);
    res.status(200).json({ success: true, data: aliases });
  } catch (error) {
    console.error('Error fetching friend aliases by user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createFriendAliasController = async (req: Request, res: Response): Promise<void> => {
  try {
    const aliasData = req.body;
    const id = await createFriendAlias(aliasData);
    res.status(201).json({
      success: true,
      data: { id_friend_aliases: id },
      message: 'Friend alias created successfully',
    });
  } catch (error) {
    console.error('Error creating friend alias:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateFriendAliasController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const aliasData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid alias ID' });
      return;
    }
    const updated = await updateFriendAlias(id, aliasData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Friend alias not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Friend alias updated successfully' });
  } catch (error) {
    console.error('Error updating friend alias:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteFriendAliasController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid alias ID' });
      return;
    }
    const deleted = await deleteFriendAlias(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Friend alias not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Friend alias deleted successfully' });
  } catch (error) {
    console.error('Error deleting friend alias:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

