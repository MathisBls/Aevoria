import {
  getAllOrderItems as getAllOrderItemsModel,
  getOrderItemById as getOrderItemByIdModel,
  getOrderItemsByOrderId as getOrderItemsByOrderIdModel,
  createOrderItem as createOrderItemModel,
  updateOrderItem as updateOrderItemModel,
  deleteOrderItem as deleteOrderItemModel,
} from '../../models/orders/orderItem.model';
import type { OrderItem } from '../../types/orders/orderItemInterface';

export const getAllOrderItems = async (): Promise<OrderItem[]> => {
  return await getAllOrderItemsModel();
};

export const getOrderItemById = async (id: string): Promise<OrderItem | null> => {
  return await getOrderItemByIdModel(id);
};

export const getOrderItemsByOrderId = async (orderId: string): Promise<OrderItem[]> => {
  return await getOrderItemsByOrderIdModel(orderId);
};

export const createOrderItem = async (orderItemData: Omit<OrderItem, 'id_order_item'>): Promise<string> => {
  return await createOrderItemModel(orderItemData);
};

export const updateOrderItem = async (id: string, orderItemData: Partial<Omit<OrderItem, 'id_order_item'>>): Promise<boolean> => {
  return await updateOrderItemModel(id, orderItemData);
};

export const deleteOrderItem = async (id: string): Promise<boolean> => {
  return await deleteOrderItemModel(id);
};

