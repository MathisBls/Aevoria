import {
  getAllGameMedias as getAllGameMediasModel,
  getGameMediaById as getGameMediaByIdModel,
  getGameMediasByGameId as getGameMediasByGameIdModel,
  createGameMedia as createGameMediaModel,
  updateGameMedia as updateGameMediaModel,
  deleteGameMedia as deleteGameMediaModel,
} from '../../models/games/gameMedia.model';
import type { GameMedia } from '../../types/games/gameMediaInterface';

export const getAllGameMedias = async (): Promise<GameMedia[]> => {
  return await getAllGameMediasModel();
};

export const getGameMediaById = async (id: string): Promise<GameMedia | null> => {
  return await getGameMediaByIdModel(id);
};

export const getGameMediasByGameId = async (gameId: string): Promise<GameMedia[]> => {
  return await getGameMediasByGameIdModel(gameId);
};

export const createGameMedia = async (gameMediaData: Omit<GameMedia, 'id_game_media' | 'uploaded_at'>): Promise<string> => {
  return await createGameMediaModel(gameMediaData);
};

export const updateGameMedia = async (id: string, gameMediaData: Partial<Omit<GameMedia, 'id_game_media' | 'uploaded_at'>>): Promise<boolean> => {
  return await updateGameMediaModel(id, gameMediaData);
};

export const deleteGameMedia = async (id: string): Promise<boolean> => {
  return await deleteGameMediaModel(id);
};

