import type { Request, Response } from 'express';
import {
  getAllArticleComments,
  getArticleCommentById,
  createArticleComment,
  updateArticleComment,
  deleteArticleComment,
} from '../../services/articles/articleComment.service';

export const getAllArticleCommentsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const comments = await getAllArticleComments();
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    console.error('Error fetching article comments:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getArticleCommentByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid comment ID' });
      return;
    }
    const comment = await getArticleCommentById(id);
    if (!comment) {
      res.status(404).json({ success: false, error: 'Article comment not found' });
      return;
    }
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    console.error('Error fetching article comment:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createArticleCommentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const commentData = req.body;
    const id = await createArticleComment(commentData);
    res.status(201).json({
      success: true,
      data: { id_article_comments: id },
      message: 'Article comment created successfully',
    });
  } catch (error) {
    console.error('Error creating article comment:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateArticleCommentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const commentData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid comment ID' });
      return;
    }
    const updated = await updateArticleComment(id, commentData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Article comment not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Article comment updated successfully' });
  } catch (error) {
    console.error('Error updating article comment:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteArticleCommentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid comment ID' });
      return;
    }
    const deleted = await deleteArticleComment(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Article comment not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Article comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting article comment:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

