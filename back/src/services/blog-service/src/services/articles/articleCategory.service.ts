import {
  getAllArticleCategories as getAllArticleCategoriesModel,
  getArticleCategoryById as getArticleCategoryByIdModel,
  createArticleCategory as createArticleCategoryModel,
  updateArticleCategory as updateArticleCategoryModel,
  deleteArticleCategory as deleteArticleCategoryModel,
} from '../../models/articles/articleCategory.model';
import type { ArticleCategory } from '../../types/articles/articleCategoryInterface';

export const getAllArticleCategories = async (): Promise<ArticleCategory[]> => {
  return await getAllArticleCategoriesModel();
};

export const getArticleCategoryById = async (id: string): Promise<ArticleCategory | null> => {
  return await getArticleCategoryByIdModel(id);
};

export const createArticleCategory = async (categoryData: Omit<ArticleCategory, 'id_article_category'>): Promise<string> => {
  return await createArticleCategoryModel(categoryData);
};

export const updateArticleCategory = async (id: string, categoryData: Partial<Omit<ArticleCategory, 'id_article_category'>>): Promise<boolean> => {
  return await updateArticleCategoryModel(id, categoryData);
};

export const deleteArticleCategory = async (id: string): Promise<boolean> => {
  return await deleteArticleCategoryModel(id);
};

