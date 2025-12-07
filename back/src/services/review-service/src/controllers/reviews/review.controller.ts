import type { Request, Response } from 'express';
import {
  getAllReviews,
  getReviewById,
  getReviewsByGameId,
  getReviewsByUserId,
  createReview,
  updateReview,
  deleteReview,
} from '../../services/reviews/review.service';

export const getAllReviewsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getReviewByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid review ID' });
      return;
    }
    const review = await getReviewById(id);
    if (!review) {
      res.status(404).json({ success: false, error: 'Review not found' });
      return;
    }
    res.status(200).json({ success: true, data: review });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getReviewsByGameIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const gameId = req.params.gameId;
    if (!gameId || gameId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid game ID' });
      return;
    }
    const reviews = await getReviewsByGameId(gameId);
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews by game:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getReviewsByUserIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID' });
      return;
    }
    const reviews = await getReviewsByUserId(userId);
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews by user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createReviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviewData = req.body;
    const id = await createReview(reviewData);
    res.status(201).json({
      success: true,
      data: { id_reviews: id },
      message: 'Review created successfully',
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateReviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const reviewData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid review ID' });
      return;
    }
    const updated = await updateReview(id, reviewData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Review not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteReviewController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid review ID' });
      return;
    }
    const deleted = await deleteReview(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Review not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

