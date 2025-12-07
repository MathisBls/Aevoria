import {
  getAllOrders as getAllOrdersModel,
  getOrderById as getOrderByIdModel,
  getOrdersByUserId as getOrdersByUserIdModel,
  createOrder as createOrderModel,
  updateOrder as updateOrderModel,
  deleteOrder as deleteOrderModel,
} from '../../models/orders/order.model';
import type { Order } from '../../types/orders/orderInterface';

export const getAllOrders = async (): Promise<Order[]> => {
  return await getAllOrdersModel();
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  return await getOrderByIdModel(id);
};

export const getOrdersByUserId = async (userId: string): Promise<Order[]> => {
  return await getOrdersByUserIdModel(userId);
};

export const createOrder = async (orderData: Omit<Order, 'id_order' | 'order_date' | 'updated_at'>): Promise<string> => {
  return await createOrderModel(orderData);
};

export const updateOrder = async (id: string, orderData: Partial<Omit<Order, 'id_order' | 'order_date'>>): Promise<boolean> => {
  return await updateOrderModel(id, orderData);
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  return await deleteOrderModel(id);
};

