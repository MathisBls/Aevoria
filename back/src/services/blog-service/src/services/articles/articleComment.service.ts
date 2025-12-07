import {
  getAllArticleComments as getAllArticleCommentsModel,
  getArticleCommentById as getArticleCommentByIdModel,
  createArticleComment as createArticleCommentModel,
  updateArticleComment as updateArticleCommentModel,
  deleteArticleComment as deleteArticleCommentModel,
} from '../../models/articles/articleComment.model';
import type { ArticleComment } from '../../types/articles/articleCommentInterface';

export const getAllArticleComments = async (): Promise<ArticleComment[]> => {
  return await getAllArticleCommentsModel();
};

export const getArticleCommentById = async (id: string): Promise<ArticleComment | null> => {
  return await getArticleCommentByIdModel(id);
};

export const createArticleComment = async (commentData: Omit<ArticleComment, 'id_article_comments' | 'created_at'>): Promise<string> => {
  return await createArticleCommentModel(commentData);
};

export const updateArticleComment = async (id: string, commentData: Partial<Omit<ArticleComment, 'id_article_comments' | 'created_at'>>): Promise<boolean> => {
  return await updateArticleCommentModel(id, commentData);
};

export const deleteArticleComment = async (id: string): Promise<boolean> => {
  return await deleteArticleCommentModel(id);
};

