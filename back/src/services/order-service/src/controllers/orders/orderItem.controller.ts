import type { Request, Response } from 'express';
import {
  getAllOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from '../../services/orders/orderItem.service';

export const getAllOrderItemsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orderItems = await getAllOrderItems();
    res.status(200).json({ success: true, data: orderItems });
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getOrderItemByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid order item ID' });
      return;
    }
    const orderItem = await getOrderItemById(id);
    if (!orderItem) {
      res.status(404).json({ success: false, error: 'Order item not found' });
      return;
    }
    res.status(200).json({ success: true, data: orderItem });
  } catch (error) {
    console.error('Error fetching order item:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getOrderItemsByOrderIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.orderId;
    if (!orderId || orderId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid order ID' });
      return;
    }
    const orderItems = await getOrderItemsByOrderId(orderId);
    res.status(200).json({ success: true, data: orderItems });
  } catch (error) {
    console.error('Error fetching order items by order:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createOrderItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItemData = req.body;
    const id = await createOrderItem(orderItemData);
    res.status(201).json({
      success: true,
      data: { id_order_item: id },
      message: 'Order item created successfully',
    });
  } catch (error) {
    console.error('Error creating order item:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateOrderItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const orderItemData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid order item ID' });
      return;
    }
    const updated = await updateOrderItem(id, orderItemData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Order item not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Order item updated successfully' });
  } catch (error) {
    console.error('Error updating order item:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteOrderItemController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid order item ID' });
      return;
    }
    const deleted = await deleteOrderItem(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Order item not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Order item deleted successfully' });
  } catch (error) {
    console.error('Error deleting order item:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

