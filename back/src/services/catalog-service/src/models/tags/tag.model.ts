import pool from '../../db/config';
import { Tag } from '../../types/tags/tagInterface';

export const getAllTags = async (): Promise<Tag[]> => {
  const [rows] = await pool.execute('SELECT id_tags, name, description FROM tags');
  return rows as Tag[];
};

export const getTagById = async (id: string): Promise<Tag | null> => {
  const [rows] = await pool.execute('SELECT id_tags, name, description FROM tags WHERE id_tags = ?', [id]);
  return (rows as Tag[])[0] || null;
};

export const createTag = async (tagData: Omit<Tag, 'id_tags'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO tags (id_tags, name, description) VALUES (UUID(), ?, ?)',
    [tagData.name, tagData.description]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_tags FROM tags WHERE name = ? ORDER BY id_tags DESC LIMIT 1',
    [tagData.name]
  );
  return (rows as { id_tags: string }[])[0]?.id_tags || '';
};

export const updateTag = async (id: string, tagData: Partial<Omit<Tag, 'id_tags'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (tagData.name !== undefined) {
    fields.push('name = ?');
    values.push(tagData.name);
  }
  if (tagData.description !== undefined) {
    fields.push('description = ?');
    values.push(tagData.description);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE tags SET ${fields.join(', ')} WHERE id_tags = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteTag = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM tags WHERE id_tags = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

