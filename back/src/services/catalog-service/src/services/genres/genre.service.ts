import {
  getAllGenres as getAllGenresModel,
  getGenreById as getGenreByIdModel,
  createGenre as createGenreModel,
  updateGenre as updateGenreModel,
  deleteGenre as deleteGenreModel,
} from '../../models/genres/genre.model';
import type { Genre } from '../../types/genres/genreInterface';

export const getAllGenres = async (): Promise<Genre[]> => {
  return await getAllGenresModel();
};

export const getGenreById = async (id: string): Promise<Genre | null> => {
  return await getGenreByIdModel(id);
};

export const createGenre = async (genreData: Omit<Genre, 'id_genre'>): Promise<string> => {
  return await createGenreModel(genreData);
};

export const updateGenre = async (id: string, genreData: Partial<Omit<Genre, 'id_genre'>>): Promise<boolean> => {
  return await updateGenreModel(id, genreData);
};

export const deleteGenre = async (id: string): Promise<boolean> => {
  return await deleteGenreModel(id);
};

