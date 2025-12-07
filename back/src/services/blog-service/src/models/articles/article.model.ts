import pool from '../../db/config';
import { Article } from '../../types/articles/articleInterface';

export const getAllArticles = async (): Promise<Article[]> => {
  const [rows] = await pool.execute(
    'SELECT id_articles, title, content, image_url, created_at, fk_id_author, fk_id_category FROM articles'
  );
  return rows as Article[];
};

export const getArticleById = async (id: string): Promise<Article | null> => {
  const [rows] = await pool.execute(
    'SELECT id_articles, title, content, image_url, created_at, fk_id_author, fk_id_category FROM articles WHERE id_articles = ?',
    [id]
  );
  return (rows as Article[])[0] || null;
};

export const createArticle = async (articleData: Omit<Article, 'id_articles' | 'created_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO articles (id_articles, title, content, image_url, fk_id_author, fk_id_category) VALUES (UUID(), ?, ?, ?, ?, ?)',
    [articleData.title, articleData.content, articleData.image_url, articleData.fk_id_author, articleData.fk_id_category]
  );

  const [rows] = await pool.execute(
    'SELECT id_articles FROM articles WHERE title = ? ORDER BY created_at DESC LIMIT 1',
    [articleData.title]
  );
  return (rows as { id_articles: string }[])[0]?.id_articles || '';
};

export const updateArticle = async (id: string, articleData: Partial<Omit<Article, 'id_articles' | 'created_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (articleData.title !== undefined) {
    fields.push('title = ?');
    values.push(articleData.title);
  }
  if (articleData.content !== undefined) {
    fields.push('content = ?');
    values.push(articleData.content);
  }
  if (articleData.image_url !== undefined) {
    fields.push('image_url = ?');
    values.push(articleData.image_url);
  }
  if (articleData.fk_id_author !== undefined) {
    fields.push('fk_id_author = ?');
    values.push(articleData.fk_id_author);
  }
  if (articleData.fk_id_category !== undefined) {
    fields.push('fk_id_category = ?');
    values.push(articleData.fk_id_category);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE articles SET ${fields.join(', ')} WHERE id_articles = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteArticle = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM articles WHERE id_articles = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

