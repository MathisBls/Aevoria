import type { Request, Response } from 'express';
import {
  getAllCartItems,
  getCartItemById,
  getCartItemsByCartId,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} from '../../services/cart/cartItem.service';

export const getAllCartItemsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const cartItems = await getAllCartItems();
    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getCartItemByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid cart item ID' });
      return;
    }
    const cartItem = await getCartItemById(id);
    if (!cartItem) {
      res.status(404).json({ success: false, error: 'Cart item not found' });
      return;
    }
    res.status(200).json({ success: true, data: cartItem });
  } catch (error) {
    console.error('Error fetching cart item:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getCartItemsByCartIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const cartId = req.params.cartId;
    if (!cartId || cartId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid cart ID' });
      return;
    }
    const cartItems = await getCartItemsByCartId(cartId);
    res.status(200).json({ success: true, data: cartItems });
  } catch (error) {
    console.error('Error fetching cart items by cart:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createCartItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const cartItemData = req.body;
    const id = await createCartItem(cartItemData);
    res.status(201).json({
      success: true,
      data: { id_cart_item: id },
      message: 'Cart item created successfully',
    });
  } catch (error) {
    console.error('Error creating cart item:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateCartItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const cartItemData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid cart item ID' });
      return;
    }
    const updated = await updateCartItem(id, cartItemData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Cart item not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Cart item updated successfully' });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteCartItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid cart item ID' });
      return;
    }
    const deleted = await deleteCartItem(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Cart item not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

