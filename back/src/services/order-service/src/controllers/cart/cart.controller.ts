import type { Request, Response } from 'express';
import {
  getAllCarts,
  getCartById,
  getCartsByUserId,
  createCart,
  updateCart,
  deleteCart,
} from '../../services/cart/cart.service';

export const getAllCartsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const carts = await getAllCarts();
    res.status(200).json({ success: true, data: carts });
  } catch (error) {
    console.error('Error fetching carts:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getCartByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid cart ID' });
      return;
    }
    const cart = await getCartById(id);
    if (!cart) {
      res.status(404).json({ success: false, error: 'Cart not found' });
      return;
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getCartsByUserIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID' });
      return;
    }
    const carts = await getCartsByUserId(userId);
    res.status(200).json({ success: true, data: carts });
  } catch (error) {
    console.error('Error fetching carts by user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createCartController = async (req: Request, res: Response): Promise<void> => {
  try {
    const cartData = req.body;
    const id = await createCart(cartData);
    res.status(201).json({
      success: true,
      data: { id_cart: id },
      message: 'Cart created successfully',
    });
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateCartController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const cartData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid cart ID' });
      return;
    }
    const updated = await updateCart(id, cartData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Cart not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteCartController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid cart ID' });
      return;
    }
    const deleted = await deleteCart(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Cart not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Cart deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

