import {
  getAllArticles as getAllArticlesModel,
  getArticleById as getArticleByIdModel,
  createArticle as createArticleModel,
  updateArticle as updateArticleModel,
  deleteArticle as deleteArticleModel,
} from '../../models/articles/article.model';
import type { Article } from '../../types/articles/articleInterface';

export const getAllArticles = async (): Promise<Article[]> => {
  return await getAllArticlesModel();
};

export const getArticleById = async (id: string): Promise<Article | null> => {
  return await getArticleByIdModel(id);
};

export const createArticle = async (articleData: Omit<Article, 'id_articles' | 'created_at'>): Promise<string> => {
  return await createArticleModel(articleData);
};

export const updateArticle = async (id: string, articleData: Partial<Omit<Article, 'id_articles' | 'created_at'>>): Promise<boolean> => {
  return await updateArticleModel(id, articleData);
};

export const deleteArticle = async (id: string): Promise<boolean> => {
  return await deleteArticleModel(id);
};

