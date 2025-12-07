import {
  getAllUserArticleComments as getAllUserArticleCommentsModel,
  getUserArticleCommentById as getUserArticleCommentByIdModel,
  createUserArticleComment as createUserArticleCommentModel,
  deleteUserArticleComment as deleteUserArticleCommentModel,
} from '../../models/articles/userArticleComment.model';
import type { UserArticleComment } from '../../types/articles/userArticleCommentInterface';

export const getAllUserArticleComments = async (): Promise<UserArticleComment[]> => {
  return await getAllUserArticleCommentsModel();
};

export const getUserArticleCommentById = async (userId: string, commentId: string): Promise<UserArticleComment | null> => {
  return await getUserArticleCommentByIdModel(userId, commentId);
};

export const createUserArticleComment = async (userCommentData: UserArticleComment): Promise<boolean> => {
  return await createUserArticleCommentModel(userCommentData);
};

export const deleteUserArticleComment = async (userId: string, commentId: string): Promise<boolean> => {
  return await deleteUserArticleCommentModel(userId, commentId);
};

