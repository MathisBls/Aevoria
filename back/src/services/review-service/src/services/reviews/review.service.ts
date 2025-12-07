import {
  getAllReviews as getAllReviewsModel,
  getReviewById as getReviewByIdModel,
  getReviewsByGameId as getReviewsByGameIdModel,
  getReviewsByUserId as getReviewsByUserIdModel,
  createReview as createReviewModel,
  updateReview as updateReviewModel,
  deleteReview as deleteReviewModel,
} from '../../models/reviews/review.model';
import type { Review } from '../../types/reviews/reviewInterface';

export const getAllReviews = async (): Promise<Review[]> => {
  return await getAllReviewsModel();
};

export const getReviewById = async (id: string): Promise<Review | null> => {
  return await getReviewByIdModel(id);
};

export const getReviewsByGameId = async (gameId: string): Promise<Review[]> => {
  return await getReviewsByGameIdModel(gameId);
};

export const getReviewsByUserId = async (userId: string): Promise<Review[]> => {
  return await getReviewsByUserIdModel(userId);
};

export const createReview = async (reviewData: Omit<Review, 'id_reviews' | 'created_at'>): Promise<string> => {
  return await createReviewModel(reviewData);
};

export const updateReview = async (id: string, reviewData: Partial<Omit<Review, 'id_reviews' | 'created_at'>>): Promise<boolean> => {
  return await updateReviewModel(id, reviewData);
};

export const deleteReview = async (id: string): Promise<boolean> => {
  return await deleteReviewModel(id);
};

