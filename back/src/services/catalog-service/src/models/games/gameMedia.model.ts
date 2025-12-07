import pool from '../../db/config';
import { GameMedia } from '../../types/games/gameMediaInterface';

export const getAllGameMedias = async (): Promise<GameMedia[]> => {
  const [rows] = await pool.execute(
    'SELECT id_game_media, media_type, media_url, thumbnail_url, uploaded_at, fk_id_games FROM game_media'
  );
  return rows as GameMedia[];
};

export const getGameMediaById = async (id: string): Promise<GameMedia | null> => {
  const [rows] = await pool.execute(
    'SELECT id_game_media, media_type, media_url, thumbnail_url, uploaded_at, fk_id_games FROM game_media WHERE id_game_media = ?',
    [id]
  );
  return (rows as GameMedia[])[0] || null;
};

export const getGameMediasByGameId = async (gameId: string): Promise<GameMedia[]> => {
  const [rows] = await pool.execute(
    'SELECT id_game_media, media_type, media_url, thumbnail_url, uploaded_at, fk_id_games FROM game_media WHERE fk_id_games = ?',
    [gameId]
  );
  return rows as GameMedia[];
};

export const createGameMedia = async (gameMediaData: Omit<GameMedia, 'id_game_media' | 'uploaded_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO game_media (id_game_media, media_type, media_url, thumbnail_url, fk_id_games) VALUES (UUID(), ?, ?, ?, ?)',
    [gameMediaData.media_type, gameMediaData.media_url, gameMediaData.thumbnail_url, gameMediaData.fk_id_games]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_game_media FROM game_media WHERE fk_id_games = ? ORDER BY uploaded_at DESC LIMIT 1',
    [gameMediaData.fk_id_games]
  );
  return (rows as { id_game_media: string }[])[0]?.id_game_media || '';
};

export const updateGameMedia = async (id: string, gameMediaData: Partial<Omit<GameMedia, 'id_game_media' | 'uploaded_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (gameMediaData.media_type !== undefined) {
    fields.push('media_type = ?');
    values.push(gameMediaData.media_type);
  }
  if (gameMediaData.media_url !== undefined) {
    fields.push('media_url = ?');
    values.push(gameMediaData.media_url);
  }
  if (gameMediaData.thumbnail_url !== undefined) {
    fields.push('thumbnail_url = ?');
    values.push(gameMediaData.thumbnail_url);
  }
  if (gameMediaData.fk_id_games !== undefined) {
    fields.push('fk_id_games = ?');
    values.push(gameMediaData.fk_id_games);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE game_media SET ${fields.join(', ')} WHERE id_game_media = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteGameMedia = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM game_media WHERE id_game_media = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

