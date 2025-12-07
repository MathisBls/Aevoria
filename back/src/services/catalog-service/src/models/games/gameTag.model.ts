import pool from '../../db/config';
import { GameTag } from '../../types/games/gameTagInterface';

export const getAllGameTags = async (): Promise<GameTag[]> => {
  const [rows] = await pool.execute('SELECT fk_id_games, fk_id_tags FROM games_tags');
  return rows as GameTag[];
};

export const getGameTagByGameAndTagId = async (gameId: string, tagId: string): Promise<GameTag | null> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_games, fk_id_tags FROM games_tags WHERE fk_id_games = ? AND fk_id_tags = ?',
    [gameId, tagId]
  );
  return (rows as GameTag[])[0] || null;
};

export const getGameTagsByGameId = async (gameId: string): Promise<GameTag[]> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_games, fk_id_tags FROM games_tags WHERE fk_id_games = ?',
    [gameId]
  );
  return rows as GameTag[];
};

export const createGameTag = async (gameTagData: GameTag): Promise<boolean> => {
  const [result] = await pool.execute(
    'INSERT INTO games_tags (fk_id_games, fk_id_tags) VALUES (?, ?)',
    [gameTagData.fk_id_games, gameTagData.fk_id_tags]
  ) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

export const deleteGameTag = async (gameId: string, tagId: string): Promise<boolean> => {
  const [result] = await pool.execute(
    'DELETE FROM games_tags WHERE fk_id_games = ? AND fk_id_tags = ?',
    [gameId, tagId]
  ) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

