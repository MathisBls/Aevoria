import type { Request, Response } from 'express';
import {
  getAllWishlists,
  getWishlistById,
  getWishlistsByUserId,
  getWishlistByUserAndGameId,
  createWishlist,
  deleteWishlist,
  deleteWishlistByUserAndGameId,
} from '../../services/wishlist/wishlist.service';

export const getAllWishlistsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const wishlists = await getAllWishlists();
    res.status(200).json({ success: true, data: wishlists });
  } catch (error) {
    console.error('Error fetching wishlists:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getWishlistByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid wishlist ID' });
      return;
    }
    const wishlist = await getWishlistById(id);
    if (!wishlist) {
      res.status(404).json({ success: false, error: 'Wishlist not found' });
      return;
    }
    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getWishlistsByUserIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID' });
      return;
    }
    const wishlists = await getWishlistsByUserId(userId);
    res.status(200).json({ success: true, data: wishlists });
  } catch (error) {
    console.error('Error fetching wishlists by user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getWishlistByUserAndGameIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const gameId = req.params.gameId;
    if (!userId || !gameId) {
      res.status(400).json({ success: false, error: 'Invalid user ID or game ID' });
      return;
    }
    const wishlist = await getWishlistByUserAndGameId(userId, gameId);
    if (!wishlist) {
      res.status(404).json({ success: false, error: 'Wishlist not found' });
      return;
    }
    res.status(200).json({ success: true, data: wishlist });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createWishlistController = async (req: Request, res: Response): Promise<void> => {
  try {
    const wishlistData = req.body;
    const id = await createWishlist(wishlistData);
    res.status(201).json({
      success: true,
      data: { id_wishlist: id },
      message: 'Wishlist created successfully',
    });
  } catch (error) {
    console.error('Error creating wishlist:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteWishlistController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid wishlist ID' });
      return;
    }
    const deleted = await deleteWishlist(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Wishlist not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Wishlist deleted successfully' });
  } catch (error) {
    console.error('Error deleting wishlist:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteWishlistByUserAndGameIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const gameId = req.params.gameId;
    if (!userId || !gameId) {
      res.status(400).json({ success: false, error: 'Invalid user ID or game ID' });
      return;
    }
    const deleted = await deleteWishlistByUserAndGameId(userId, gameId);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Wishlist not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Wishlist deleted successfully' });
  } catch (error) {
    console.error('Error deleting wishlist:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

