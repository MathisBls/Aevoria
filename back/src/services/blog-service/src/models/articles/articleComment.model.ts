import pool from '../../db/config';
import { ArticleComment } from '../../types/articles/articleCommentInterface';

export const getAllArticleComments = async (): Promise<ArticleComment[]> => {
  const [rows] = await pool.execute(
    'SELECT id_article_comments, comment_text, created_at, fk_id_articles FROM article_comments'
  );
  return rows as ArticleComment[];
};

export const getArticleCommentById = async (id: string): Promise<ArticleComment | null> => {
  const [rows] = await pool.execute(
    'SELECT id_article_comments, comment_text, created_at, fk_id_articles FROM article_comments WHERE id_article_comments = ?',
    [id]
  );
  return (rows as ArticleComment[])[0] || null;
};

export const createArticleComment = async (commentData: Omit<ArticleComment, 'id_article_comments' | 'created_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO article_comments (id_article_comments, comment_text, fk_id_articles) VALUES (UUID(), ?, ?)',
    [commentData.comment_text, commentData.fk_id_articles]
  );

  const [rows] = await pool.execute(
    'SELECT id_article_comments FROM article_comments WHERE fk_id_articles = ? ORDER BY created_at DESC LIMIT 1',
    [commentData.fk_id_articles]
  );
  return (rows as { id_article_comments: string }[])[0]?.id_article_comments || '';
};

export const updateArticleComment = async (id: string, commentData: Partial<Omit<ArticleComment, 'id_article_comments' | 'created_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (commentData.comment_text !== undefined) {
    fields.push('comment_text = ?');
    values.push(commentData.comment_text);
  }
  if (commentData.fk_id_articles !== undefined) {
    fields.push('fk_id_articles = ?');
    values.push(commentData.fk_id_articles);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE article_comments SET ${fields.join(', ')} WHERE id_article_comments = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteArticleComment = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM article_comments WHERE id_article_comments = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

