import type { Request, Response } from 'express';
import {
  getAllGameTags,
  getGameTagByGameAndTagId,
  getGameTagsByGameId,
  createGameTag,
  deleteGameTag,
} from '../../services/games/gameTag.service';

export const getAllGameTagsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const gameTags = await getAllGameTags();
    res.status(200).json({ success: true, data: gameTags });
  } catch (error) {
    console.error('Error fetching game tags:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getGameTagByGameAndTagIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameId = req.params.gameId;
    const tagId = req.params.tagId;
    if (!gameId || !tagId) {
      res.status(400).json({ success: false, error: 'Invalid game ID or tag ID' });
      return;
    }
    const gameTag = await getGameTagByGameAndTagId(gameId, tagId);
    if (!gameTag) {
      res.status(404).json({ success: false, error: 'Game tag not found' });
      return;
    }
    res.status(200).json({ success: true, data: gameTag });
  } catch (error) {
    console.error('Error fetching game tag:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getGameTagsByGameIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameId = req.params.gameId;
    if (!gameId || gameId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid game ID' });
      return;
    }
    const gameTags = await getGameTagsByGameId(gameId);
    res.status(200).json({ success: true, data: gameTags });
  } catch (error) {
    console.error('Error fetching game tags by game:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createGameTagController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameTagData = req.body;
    const created = await createGameTag(gameTagData);
    if (!created) {
      res.status(400).json({ success: false, error: 'Failed to create game tag' });
      return;
    }
    res.status(201).json({ success: true, message: 'Game tag created successfully' });
  } catch (error) {
    console.error('Error creating game tag:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteGameTagController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameId = req.params.gameId;
    const tagId = req.params.tagId;
    if (!gameId || !tagId) {
      res.status(400).json({ success: false, error: 'Invalid game ID or tag ID' });
      return;
    }
    const deleted = await deleteGameTag(gameId, tagId);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Game tag not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Game tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting game tag:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

