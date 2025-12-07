import {
  getAllGames as getAllGamesModel,
  getGameById as getGameByIdModel,
  createGame as createGameModel,
  updateGame as updateGameModel,
  deleteGame as deleteGameModel,
} from '../../models/games/game.model';
import type { Game } from '../../types/games/gameInterface';

export const getAllGames = async (): Promise<Game[]> => {
  return await getAllGamesModel();
};

export const getGameById = async (id: string): Promise<Game | null> => {
  return await getGameByIdModel(id);
};

export const createGame = async (gameData: Omit<Game, 'id_games' | 'created_at'>): Promise<string> => {
  return await createGameModel(gameData);
};

export const updateGame = async (id: string, gameData: Partial<Omit<Game, 'id_games' | 'created_at'>>): Promise<boolean> => {
  return await updateGameModel(id, gameData);
};

export const deleteGame = async (id: string): Promise<boolean> => {
  return await deleteGameModel(id);
};

