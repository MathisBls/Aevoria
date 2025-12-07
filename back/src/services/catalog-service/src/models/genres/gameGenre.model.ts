import pool from '../../db/config';
import { GameGenre } from '../../types/genres/gameGenreInterface';

export const getAllGameGenres = async (): Promise<GameGenre[]> => {
  const [rows] = await pool.execute('SELECT fk_id_games, fk_id_genre FROM games_genres');
  return rows as GameGenre[];
};

export const getGameGenreByGameAndGenreId = async (gameId: string, genreId: string): Promise<GameGenre | null> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_games, fk_id_genre FROM games_genres WHERE fk_id_games = ? AND fk_id_genre = ?',
    [gameId, genreId]
  );
  return (rows as GameGenre[])[0] || null;
};

export const getGameGenresByGameId = async (gameId: string): Promise<GameGenre[]> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_games, fk_id_genre FROM games_genres WHERE fk_id_games = ?',
    [gameId]
  );
  return rows as GameGenre[];
};

export const createGameGenre = async (gameGenreData: GameGenre): Promise<boolean> => {
  const [result] = await pool.execute(
    'INSERT INTO games_genres (fk_id_games, fk_id_genre) VALUES (?, ?)',
    [gameGenreData.fk_id_games, gameGenreData.fk_id_genre]
  ) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

export const deleteGameGenre = async (gameId: string, genreId: string): Promise<boolean> => {
  const [result] = await pool.execute(
    'DELETE FROM games_genres WHERE fk_id_games = ? AND fk_id_genre = ?',
    [gameId, genreId]
  ) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

