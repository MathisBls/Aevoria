import {
  getAllTags as getAllTagsModel,
  getTagById as getTagByIdModel,
  createTag as createTagModel,
  updateTag as updateTagModel,
  deleteTag as deleteTagModel,
} from '../../models/tags/tag.model';
import type { Tag } from '../../types/tags/tagInterface';

export const getAllTags = async (): Promise<Tag[]> => {
  return await getAllTagsModel();
};

export const getTagById = async (id: string): Promise<Tag | null> => {
  return await getTagByIdModel(id);
};

export const createTag = async (tagData: Omit<Tag, 'id_tags'>): Promise<string> => {
  return await createTagModel(tagData);
};

export const updateTag = async (id: string, tagData: Partial<Omit<Tag, 'id_tags'>>): Promise<boolean> => {
  return await updateTagModel(id, tagData);
};

export const deleteTag = async (id: string): Promise<boolean> => {
  return await deleteTagModel(id);
};

