import pool from '../../db/config';
import { Review } from '../../types/reviews/reviewInterface';

export const getAllReviews = async (): Promise<Review[]> => {
  const [rows] = await pool.execute(
    'SELECT id_reviews, rating, review_text, video_url, created_at, fk_id_user, fk_id_games FROM reviews'
  );
  return rows as Review[];
};

export const getReviewById = async (id: string): Promise<Review | null> => {
  const [rows] = await pool.execute(
    'SELECT id_reviews, rating, review_text, video_url, created_at, fk_id_user, fk_id_games FROM reviews WHERE id_reviews = ?',
    [id]
  );
  return (rows as Review[])[0] || null;
};

export const getReviewsByGameId = async (gameId: string): Promise<Review[]> => {
  const [rows] = await pool.execute(
    'SELECT id_reviews, rating, review_text, video_url, created_at, fk_id_user, fk_id_games FROM reviews WHERE fk_id_games = ?',
    [gameId]
  );
  return rows as Review[];
};

export const getReviewsByUserId = async (userId: string): Promise<Review[]> => {
  const [rows] = await pool.execute(
    'SELECT id_reviews, rating, review_text, video_url, created_at, fk_id_user, fk_id_games FROM reviews WHERE fk_id_user = ?',
    [userId]
  );
  return rows as Review[];
};

export const createReview = async (reviewData: Omit<Review, 'id_reviews' | 'created_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO reviews (id_reviews, rating, review_text, video_url, fk_id_user, fk_id_games) VALUES (UUID(), ?, ?, ?, ?, ?)',
    [reviewData.rating, reviewData.review_text, reviewData.video_url, reviewData.fk_id_user, reviewData.fk_id_games]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_reviews FROM reviews WHERE fk_id_user = ? ORDER BY created_at DESC LIMIT 1',
    [reviewData.fk_id_user]
  );
  return (rows as { id_reviews: string }[])[0]?.id_reviews || '';
};

export const updateReview = async (id: string, reviewData: Partial<Omit<Review, 'id_reviews' | 'created_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (reviewData.rating !== undefined) {
    fields.push('rating = ?');
    values.push(reviewData.rating);
  }
  if (reviewData.review_text !== undefined) {
    fields.push('review_text = ?');
    values.push(reviewData.review_text);
  }
  if (reviewData.video_url !== undefined) {
    fields.push('video_url = ?');
    values.push(reviewData.video_url);
  }
  if (reviewData.fk_id_user !== undefined) {
    fields.push('fk_id_user = ?');
    values.push(reviewData.fk_id_user);
  }
  if (reviewData.fk_id_games !== undefined) {
    fields.push('fk_id_games = ?');
    values.push(reviewData.fk_id_games);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE reviews SET ${fields.join(', ')} WHERE id_reviews = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteReview = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM reviews WHERE id_reviews = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

