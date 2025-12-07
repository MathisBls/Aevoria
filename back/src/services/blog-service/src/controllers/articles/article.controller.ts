import type { Request, Response } from 'express';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../../services/articles/article.service';

export const getAllArticlesController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const articles = await getAllArticles();
    res.status(200).json({ success: true, data: articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getArticleByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid article ID' });
      return;
    }
    const article = await getArticleById(id);
    if (!article) {
      res.status(404).json({ success: false, error: 'Article not found' });
      return;
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createArticleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const articleData = req.body;
    const id = await createArticle(articleData);
    res.status(201).json({
      success: true,
      data: { id_articles: id },
      message: 'Article created successfully',
    });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateArticleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const articleData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid article ID' });
      return;
    }
    const updated = await updateArticle(id, articleData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Article not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Article updated successfully' });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteArticleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid article ID' });
      return;
    }
    const deleted = await deleteArticle(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Article not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

