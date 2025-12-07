import type { Request, Response } from 'express';
import {
  getAllMessages,
  getMessageById,
  getMessagesByUserId,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../../services/messages/message.service';

export const getAllMessagesController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const messages = await getAllMessages();
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getMessageByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid message ID' });
      return;
    }
    const message = await getMessageById(id);
    if (!message) {
      res.status(404).json({ success: false, error: 'Message not found' });
      return;
    }
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getMessagesByUserIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID' });
      return;
    }
    const messages = await getMessagesByUserId(userId);
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching messages by user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createMessageController = async (req: Request, res: Response): Promise<void> => {
  try {
    const messageData = req.body;
    const id = await createMessage(messageData);
    res.status(201).json({
      success: true,
      data: { id_messages: id },
      message: 'Message created successfully',
    });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateMessageController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const messageData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid message ID' });
      return;
    }
    const updated = await updateMessage(id, messageData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Message not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Message updated successfully' });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteMessageController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid message ID' });
      return;
    }
    const deleted = await deleteMessage(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Message not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

