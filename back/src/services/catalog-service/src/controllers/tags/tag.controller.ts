import type { Request, Response } from 'express';
import {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from '../../services/tags/tag.service';

export const getAllTagsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tags = await getAllTags();
    res.status(200).json({ success: true, data: tags });
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getTagByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid tag ID' });
      return;
    }
    const tag = await getTagById(id);
    if (!tag) {
      res.status(404).json({ success: false, error: 'Tag not found' });
      return;
    }
    res.status(200).json({ success: true, data: tag });
  } catch (error) {
    console.error('Error fetching tag:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createTagController = async (req: Request, res: Response): Promise<void> => {
  try {
    const tagData = req.body;
    const id = await createTag(tagData);
    res.status(201).json({
      success: true,
      data: { id_tags: id },
      message: 'Tag created successfully',
    });
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateTagController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const tagData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid tag ID' });
      return;
    }
    const updated = await updateTag(id, tagData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Tag not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Tag updated successfully' });
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteTagController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid tag ID' });
      return;
    }
    const deleted = await deleteTag(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Tag not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

