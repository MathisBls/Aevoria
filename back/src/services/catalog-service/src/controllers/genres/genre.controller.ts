import type { Request, Response } from 'express';
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} from '../../services/genres/genre.service';

export const getAllGenresController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const genres = await getAllGenres();
    res.status(200).json({ success: true, data: genres });
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getGenreByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid genre ID' });
      return;
    }
    const genre = await getGenreById(id);
    if (!genre) {
      res.status(404).json({ success: false, error: 'Genre not found' });
      return;
    }
    res.status(200).json({ success: true, data: genre });
  } catch (error) {
    console.error('Error fetching genre:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createGenreController = async (req: Request, res: Response): Promise<void> => {
  try {
    const genreData = req.body;
    const id = await createGenre(genreData);
    res.status(201).json({
      success: true,
      data: { id_genre: id },
      message: 'Genre created successfully',
    });
  } catch (error) {
    console.error('Error creating genre:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateGenreController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const genreData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid genre ID' });
      return;
    }
    const updated = await updateGenre(id, genreData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Genre not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Genre updated successfully' });
  } catch (error) {
    console.error('Error updating genre:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteGenreController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid genre ID' });
      return;
    }
    const deleted = await deleteGenre(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Genre not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Genre deleted successfully' });
  } catch (error) {
    console.error('Error deleting genre:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

