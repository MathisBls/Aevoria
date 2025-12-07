import type { Request, Response } from 'express';
import {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from '../../services/games/game.service';

export const getAllGamesController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const games = await getAllGames();
    res.status(200).json({ success: true, data: games });
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getGameByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid game ID' });
      return;
    }
    const game = await getGameById(id);
    if (!game) {
      res.status(404).json({ success: false, error: 'Game not found' });
      return;
    }
    res.status(200).json({ success: true, data: game });
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createGameController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameData = req.body;
    const id = await createGame(gameData);
    res.status(201).json({
      success: true,
      data: { id_games: id },
      message: 'Game created successfully',
    });
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateGameController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const gameData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid game ID' });
      return;
    }
    const updated = await updateGame(id, gameData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Game not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Game updated successfully' });
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteGameController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid game ID' });
      return;
    }
    const deleted = await deleteGame(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Game not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

