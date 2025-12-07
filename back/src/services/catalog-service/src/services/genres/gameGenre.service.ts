import {
  getAllGameGenres as getAllGameGenresModel,
  getGameGenreByGameAndGenreId as getGameGenreByGameAndGenreIdModel,
  getGameGenresByGameId as getGameGenresByGameIdModel,
  createGameGenre as createGameGenreModel,
  deleteGameGenre as deleteGameGenreModel,
} from '../../models/genres/gameGenre.model';
import type { GameGenre } from '../../types/genres/gameGenreInterface';

export const getAllGameGenres = async (): Promise<GameGenre[]> => {
  return await getAllGameGenresModel();
};

export const getGameGenreByGameAndGenreId = async (gameId: string, genreId: string): Promise<GameGenre | null> => {
  return await getGameGenreByGameAndGenreIdModel(gameId, genreId);
};

export const getGameGenresByGameId = async (gameId: string): Promise<GameGenre[]> => {
  return await getGameGenresByGameIdModel(gameId);
};

export const createGameGenre = async (gameGenreData: GameGenre): Promise<boolean> => {
  return await createGameGenreModel(gameGenreData);
};

export const deleteGameGenre = async (gameId: string, genreId: string): Promise<boolean> => {
  return await deleteGameGenreModel(gameId, genreId);
};

