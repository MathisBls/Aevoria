import type { Request, Response } from 'express';
import {
  getAllFriends,
  getFriendByUserAndFriendId,
  getFriendsByUserId,
  createFriend,
  updateFriend,
  deleteFriend,
} from '../../services/friends/friend.service';

export const getAllFriendsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const friends = await getAllFriends();
    res.status(200).json({ success: true, data: friends });
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getFriendByUserAndFriendIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    if (!userId || !friendId) {
      res.status(400).json({ success: false, error: 'Invalid user ID or friend ID' });
      return;
    }
    const friend = await getFriendByUserAndFriendId(userId, friendId);
    if (!friend) {
      res.status(404).json({ success: false, error: 'Friend relationship not found' });
      return;
    }
    res.status(200).json({ success: true, data: friend });
  } catch (error) {
    console.error('Error fetching friend:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getFriendsByUserIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID' });
      return;
    }
    const friends = await getFriendsByUserId(userId);
    res.status(200).json({ success: true, data: friends });
  } catch (error) {
    console.error('Error fetching friends by user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createFriendController = async (req: Request, res: Response): Promise<void> => {
  try {
    const friendData = req.body;
    const created = await createFriend(friendData);
    if (!created) {
      res.status(400).json({ success: false, error: 'Failed to create friend relationship' });
      return;
    }
    res.status(201).json({ success: true, message: 'Friend relationship created successfully' });
  } catch (error) {
    console.error('Error creating friend:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateFriendController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    const friendData = req.body;
    if (!userId || !friendId) {
      res.status(400).json({ success: false, error: 'Invalid user ID or friend ID' });
      return;
    }
    const updated = await updateFriend(userId, friendId, friendData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Friend relationship not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Friend relationship updated successfully' });
  } catch (error) {
    console.error('Error updating friend:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteFriendController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    if (!userId || !friendId) {
      res.status(400).json({ success: false, error: 'Invalid user ID or friend ID' });
      return;
    }
    const deleted = await deleteFriend(userId, friendId);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Friend relationship not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Friend relationship deleted successfully' });
  } catch (error) {
    console.error('Error deleting friend:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

