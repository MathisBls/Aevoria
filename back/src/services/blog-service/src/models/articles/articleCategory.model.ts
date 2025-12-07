import pool from '../../db/config';
import { ArticleCategory } from '../../types/articles/articleCategoryInterface';

export const getAllArticleCategories = async (): Promise<ArticleCategory[]> => {
  const [rows] = await pool.execute(
    'SELECT id_article_category, name, description FROM article_categories'
  );
  return rows as ArticleCategory[];
};

export const getArticleCategoryById = async (id: string): Promise<ArticleCategory | null> => {
  const [rows] = await pool.execute(
    'SELECT id_article_category, name, description FROM article_categories WHERE id_article_category = ?',
    [id]
  );
  return (rows as ArticleCategory[])[0] || null;
};

export const createArticleCategory = async (categoryData: Omit<ArticleCategory, 'id_article_category'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO article_categories (id_article_category, name, description) VALUES (UUID(), ?, ?)',
    [categoryData.name, categoryData.description]
  );

  const [rows] = await pool.execute(
    'SELECT id_article_category FROM article_categories WHERE name = ? ORDER BY id_article_category DESC LIMIT 1',
    [categoryData.name]
  );
  return (rows as { id_article_category: string }[])[0]?.id_article_category || '';
};

export const updateArticleCategory = async (id: string, categoryData: Partial<Omit<ArticleCategory, 'id_article_category'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (categoryData.name !== undefined) {
    fields.push('name = ?');
    values.push(categoryData.name);
  }
  if (categoryData.description !== undefined) {
    fields.push('description = ?');
    values.push(categoryData.description);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE article_categories SET ${fields.join(', ')} WHERE id_article_category = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteArticleCategory = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM article_categories WHERE id_article_category = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

