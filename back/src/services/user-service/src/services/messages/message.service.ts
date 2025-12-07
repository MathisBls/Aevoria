import {
  getAllMessages as getAllMessagesModel,
  getMessageById as getMessageByIdModel,
  getMessagesByUserId as getMessagesByUserIdModel,
  createMessage as createMessageModel,
  updateMessage as updateMessageModel,
  deleteMessage as deleteMessageModel,
} from '../../models/messages/message.model';
import type { Message } from '../../types/messages/messageInterface';

export const getAllMessages = async (): Promise<Message[]> => {
  return await getAllMessagesModel();
};

export const getMessageById = async (id: string): Promise<Message | null> => {
  return await getMessageByIdModel(id);
};

export const getMessagesByUserId = async (userId: string): Promise<Message[]> => {
  return await getMessagesByUserIdModel(userId);
};

export const createMessage = async (messageData: Omit<Message, 'id_messages' | 'create_at'>): Promise<string> => {
  return await createMessageModel(messageData);
};

export const updateMessage = async (id: string, messageData: Partial<Omit<Message, 'id_messages' | 'create_at'>>): Promise<boolean> => {
  return await updateMessageModel(id, messageData);
};

export const deleteMessage = async (id: string): Promise<boolean> => {
  return await deleteMessageModel(id);
};

