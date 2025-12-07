import type { Request, Response } from 'express';
import {
  getAllGameGenres,
  getGameGenreByGameAndGenreId,
  getGameGenresByGameId,
  createGameGenre,
  deleteGameGenre,
} from '../../services/genres/gameGenre.service';

export const getAllGameGenresController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const gameGenres = await getAllGameGenres();
    res.status(200).json({ success: true, data: gameGenres });
  } catch (error) {
    console.error('Error fetching game genres:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getGameGenreByGameAndGenreIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameId = req.params.gameId;
    const genreId = req.params.genreId;
    if (!gameId || !genreId) {
      res.status(400).json({ success: false, error: 'Invalid game ID or genre ID' });
      return;
    }
    const gameGenre = await getGameGenreByGameAndGenreId(gameId, genreId);
    if (!gameGenre) {
      res.status(404).json({ success: false, error: 'Game genre not found' });
      return;
    }
    res.status(200).json({ success: true, data: gameGenre });
  } catch (error) {
    console.error('Error fetching game genre:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getGameGenresByGameIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameId = req.params.gameId;
    if (!gameId || gameId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid game ID' });
      return;
    }
    const gameGenres = await getGameGenresByGameId(gameId);
    res.status(200).json({ success: true, data: gameGenres });
  } catch (error) {
    console.error('Error fetching game genres by game:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createGameGenreController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameGenreData = req.body;
    const created = await createGameGenre(gameGenreData);
    if (!created) {
      res.status(400).json({ success: false, error: 'Failed to create game genre' });
      return;
    }
    res.status(201).json({ success: true, message: 'Game genre created successfully' });
  } catch (error) {
    console.error('Error creating game genre:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteGameGenreController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameId = req.params.gameId;
    const genreId = req.params.genreId;
    if (!gameId || !genreId) {
      res.status(400).json({ success: false, error: 'Invalid game ID or genre ID' });
      return;
    }
    const deleted = await deleteGameGenre(gameId, genreId);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Game genre not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Game genre deleted successfully' });
  } catch (error) {
    console.error('Error deleting game genre:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

