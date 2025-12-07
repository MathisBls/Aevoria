import type { Request, Response } from 'express';
import {
  getAllArticleCategories,
  getArticleCategoryById,
  createArticleCategory,
  updateArticleCategory,
  deleteArticleCategory,
} from '../../services/articles/articleCategory.service';

export const getAllArticleCategoriesController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getAllArticleCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching article categories:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getArticleCategoryByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid category ID' });
      return;
    }
    const category = await getArticleCategoryById(id);
    if (!category) {
      res.status(404).json({ success: false, error: 'Article category not found' });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error('Error fetching article category:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createArticleCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryData = req.body;
    const id = await createArticleCategory(categoryData);
    res.status(201).json({
      success: true,
      data: { id_article_category: id },
      message: 'Article category created successfully',
    });
  } catch (error) {
    console.error('Error creating article category:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateArticleCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const categoryData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid category ID' });
      return;
    }
    const updated = await updateArticleCategory(id, categoryData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Article category not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Article category updated successfully' });
  } catch (error) {
    console.error('Error updating article category:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteArticleCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid category ID' });
      return;
    }
    const deleted = await deleteArticleCategory(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Article category not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Article category deleted successfully' });
  } catch (error) {
    console.error('Error deleting article category:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

