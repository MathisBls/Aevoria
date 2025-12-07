import pool from '../../db/config';
import { Genre } from '../../types/genres/genreInterface';

export const getAllGenres = async (): Promise<Genre[]> => {
  const [rows] = await pool.execute('SELECT id_genre, name, description FROM genres');
  return rows as Genre[];
};

export const getGenreById = async (id: string): Promise<Genre | null> => {
  const [rows] = await pool.execute('SELECT id_genre, name, description FROM genres WHERE id_genre = ?', [id]);
  return (rows as Genre[])[0] || null;
};

export const createGenre = async (genreData: Omit<Genre, 'id_genre'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO genres (id_genre, name, description) VALUES (UUID(), ?, ?)',
    [genreData.name, genreData.description]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_genre FROM genres WHERE name = ? ORDER BY id_genre DESC LIMIT 1',
    [genreData.name]
  );
  return (rows as { id_genre: string }[])[0]?.id_genre || '';
};

export const updateGenre = async (id: string, genreData: Partial<Omit<Genre, 'id_genre'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (genreData.name !== undefined) {
    fields.push('name = ?');
    values.push(genreData.name);
  }
  if (genreData.description !== undefined) {
    fields.push('description = ?');
    values.push(genreData.description);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE genres SET ${fields.join(', ')} WHERE id_genre = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteGenre = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM genres WHERE id_genre = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

