import type { Request, Response } from 'express';
import {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../../services/orders/order.service';

export const getAllOrdersController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getOrderByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid order ID' });
      return;
    }
    const order = await getOrderById(id);
    if (!order) {
      res.status(404).json({ success: false, error: 'Order not found' });
      return;
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getOrdersByUserIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID' });
      return;
    }
    const orders = await getOrdersByUserId(userId);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching orders by user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body;
    const id = await createOrder(orderData);
    res.status(201).json({
      success: true,
      data: { id_order: id },
      message: 'Order created successfully',
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const orderData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid order ID' });
      return;
    }
    const updated = await updateOrder(id, orderData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Order not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid order ID' });
      return;
    }
    const deleted = await deleteOrder(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Order not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

