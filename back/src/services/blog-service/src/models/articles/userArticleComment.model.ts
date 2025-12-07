import pool from '../../db/config';
import { UserArticleComment } from '../../types/articles/userArticleCommentInterface';

export const getAllUserArticleComments = async (): Promise<UserArticleComment[]> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_user, fk_id_article_comments FROM user_article_comments'
  );
  return rows as UserArticleComment[];
};

export const getUserArticleCommentById = async (userId: string, commentId: string): Promise<UserArticleComment | null> => {
  const [rows] = await pool.execute(
    'SELECT fk_id_user, fk_id_article_comments FROM user_article_comments WHERE fk_id_user = ? AND fk_id_article_comments = ?',
    [userId, commentId]
  );
  return (rows as UserArticleComment[])[0] || null;
};

export const createUserArticleComment = async (userCommentData: UserArticleComment): Promise<boolean> => {
  const [result] = await pool.execute(
    'INSERT INTO user_article_comments (fk_id_user, fk_id_article_comments) VALUES (?, ?)',
    [userCommentData.fk_id_user, userCommentData.fk_id_article_comments]
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteUserArticleComment = async (userId: string, commentId: string): Promise<boolean> => {
  const [result] = await pool.execute(
    'DELETE FROM user_article_comments WHERE fk_id_user = ? AND fk_id_article_comments = ?',
    [userId, commentId]
  ) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

