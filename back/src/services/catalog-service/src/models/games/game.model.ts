import pool from '../../db/config';
import { Game } from '../../types/games/gameInterface';

export const getAllGames = async (): Promise<Game[]> => {
  const [rows] = await pool.execute(
    'SELECT id_games, title, description, banner_url, thumbnail_url, price, discount, release_date, installation_notes, ratings, reviews_count, created_at, fk_id_user FROM games'
  );
  return rows as Game[];
};

export const getGameById = async (id: string): Promise<Game | null> => {
  const [rows] = await pool.execute(
    'SELECT id_games, title, description, banner_url, thumbnail_url, price, discount, release_date, installation_notes, ratings, reviews_count, created_at, fk_id_user FROM games WHERE id_games = ?',
    [id]
  );
  return (rows as Game[])[0] || null;
};

export const createGame = async (gameData: Omit<Game, 'id_games' | 'created_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO games (id_games, title, description, banner_url, thumbnail_url, price, discount, release_date, installation_notes, ratings, reviews_count, fk_id_user) VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      gameData.title,
      gameData.description,
      gameData.banner_url,
      gameData.thumbnail_url,
      gameData.price,
      gameData.discount,
      gameData.release_date,
      gameData.installation_notes,
      gameData.ratings,
      gameData.reviews_count,
      gameData.fk_id_user,
    ]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_games FROM games WHERE title = ? ORDER BY created_at DESC LIMIT 1',
    [gameData.title]
  );
  return (rows as { id_games: string }[])[0]?.id_games || '';
};

export const updateGame = async (id: string, gameData: Partial<Omit<Game, 'id_games' | 'created_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (gameData.title !== undefined) {
    fields.push('title = ?');
    values.push(gameData.title);
  }
  if (gameData.description !== undefined) {
    fields.push('description = ?');
    values.push(gameData.description);
  }
  if (gameData.banner_url !== undefined) {
    fields.push('banner_url = ?');
    values.push(gameData.banner_url);
  }
  if (gameData.thumbnail_url !== undefined) {
    fields.push('thumbnail_url = ?');
    values.push(gameData.thumbnail_url);
  }
  if (gameData.price !== undefined) {
    fields.push('price = ?');
    values.push(gameData.price);
  }
  if (gameData.discount !== undefined) {
    fields.push('discount = ?');
    values.push(gameData.discount);
  }
  if (gameData.release_date !== undefined) {
    fields.push('release_date = ?');
    values.push(gameData.release_date);
  }
  if (gameData.installation_notes !== undefined) {
    fields.push('installation_notes = ?');
    values.push(gameData.installation_notes);
  }
  if (gameData.ratings !== undefined) {
    fields.push('ratings = ?');
    values.push(gameData.ratings);
  }
  if (gameData.reviews_count !== undefined) {
    fields.push('reviews_count = ?');
    values.push(gameData.reviews_count);
  }
  if (gameData.fk_id_user !== undefined) {
    fields.push('fk_id_user = ?');
    values.push(gameData.fk_id_user);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE games SET ${fields.join(', ')} WHERE id_games = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteGame = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM games WHERE id_games = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

