import type { Request, Response } from 'express';
import {
  getAllGameMedias,
  getGameMediaById,
  getGameMediasByGameId,
  createGameMedia,
  updateGameMedia,
  deleteGameMedia,
} from '../../services/games/gameMedia.service';

export const getAllGameMediasController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const gameMedias = await getAllGameMedias();
    res.status(200).json({ success: true, data: gameMedias });
  } catch (error) {
    console.error('Error fetching game medias:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getGameMediaByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid game media ID' });
      return;
    }
    const gameMedia = await getGameMediaById(id);
    if (!gameMedia) {
      res.status(404).json({ success: false, error: 'Game media not found' });
      return;
    }
    res.status(200).json({ success: true, data: gameMedia });
  } catch (error) {
    console.error('Error fetching game media:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getGameMediasByGameIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameId = req.params.gameId;
    if (!gameId || gameId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid game ID' });
      return;
    }
    const gameMedias = await getGameMediasByGameId(gameId);
    res.status(200).json({ success: true, data: gameMedias });
  } catch (error) {
    console.error('Error fetching game medias by game:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createGameMediaController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameMediaData = req.body;
    const id = await createGameMedia(gameMediaData);
    res.status(201).json({
      success: true,
      data: { id_game_media: id },
      message: 'Game media created successfully',
    });
  } catch (error) {
    console.error('Error creating game media:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateGameMediaController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const gameMediaData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid game media ID' });
      return;
    }
    const updated = await updateGameMedia(id, gameMediaData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Game media not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Game media updated successfully' });
  } catch (error) {
    console.error('Error updating game media:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteGameMediaController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid game media ID' });
      return;
    }
    const deleted = await deleteGameMedia(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Game media not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Game media deleted successfully' });
  } catch (error) {
    console.error('Error deleting game media:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

