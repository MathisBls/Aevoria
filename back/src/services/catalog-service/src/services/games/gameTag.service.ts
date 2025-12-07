import {
  getAllGameTags as getAllGameTagsModel,
  getGameTagByGameAndTagId as getGameTagByGameAndTagIdModel,
  getGameTagsByGameId as getGameTagsByGameIdModel,
  createGameTag as createGameTagModel,
  deleteGameTag as deleteGameTagModel,
} from '../../models/games/gameTag.model';
import type { GameTag } from '../../types/games/gameTagInterface';

export const getAllGameTags = async (): Promise<GameTag[]> => {
  return await getAllGameTagsModel();
};

export const getGameTagByGameAndTagId = async (gameId: string, tagId: string): Promise<GameTag | null> => {
  return await getGameTagByGameAndTagIdModel(gameId, tagId);
};

export const getGameTagsByGameId = async (gameId: string): Promise<GameTag[]> => {
  return await getGameTagsByGameIdModel(gameId);
};

export const createGameTag = async (gameTagData: GameTag): Promise<boolean> => {
  return await createGameTagModel(gameTagData);
};

export const deleteGameTag = async (gameId: string, tagId: string): Promise<boolean> => {
  return await deleteGameTagModel(gameId, tagId);
};

