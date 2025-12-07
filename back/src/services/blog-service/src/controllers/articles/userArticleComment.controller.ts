import type { Request, Response } from 'express';
import {
  getAllUserArticleComments,
  getUserArticleCommentById,
  createUserArticleComment,
  deleteUserArticleComment,
} from '../../services/articles/userArticleComment.service';

export const getAllUserArticleCommentsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const userComments = await getAllUserArticleComments();
    res.status(200).json({ success: true, data: userComments });
  } catch (error) {
    console.error('Error fetching user article comments:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getUserArticleCommentByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const commentId = req.params.commentId;
    if (!userId || userId.trim() === '' || !commentId || commentId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID or comment ID' });
      return;
    }
    const userComment = await getUserArticleCommentById(userId, commentId);
    if (!userComment) {
      res.status(404).json({ success: false, error: 'User article comment not found' });
      return;
    }
    res.status(200).json({ success: true, data: userComment });
  } catch (error) {
    console.error('Error fetching user article comment:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createUserArticleCommentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userCommentData = req.body;
    const created = await createUserArticleComment(userCommentData);
    if (!created) {
      res.status(400).json({ success: false, error: 'Failed to create user article comment' });
      return;
    }
    res.status(201).json({
      success: true,
      message: 'User article comment created successfully',
    });
  } catch (error) {
    console.error('Error creating user article comment:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteUserArticleCommentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const commentId = req.params.commentId;
    if (!userId || userId.trim() === '' || !commentId || commentId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID or comment ID' });
      return;
    }
    const deleted = await deleteUserArticleComment(userId, commentId);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'User article comment not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'User article comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting user article comment:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

