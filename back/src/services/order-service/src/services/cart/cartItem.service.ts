import {
  getAllCartItems as getAllCartItemsModel,
  getCartItemById as getCartItemByIdModel,
  getCartItemsByCartId as getCartItemsByCartIdModel,
  createCartItem as createCartItemModel,
  updateCartItem as updateCartItemModel,
  deleteCartItem as deleteCartItemModel,
} from '../../models/cart/cartItem.model';
import type { CartItem } from '../../types/cart/cartItemInterface';

export const getAllCartItems = async (): Promise<CartItem[]> => {
  return await getAllCartItemsModel();
};

export const getCartItemById = async (id: string): Promise<CartItem | null> => {
  return await getCartItemByIdModel(id);
};

export const getCartItemsByCartId = async (cartId: string): Promise<CartItem[]> => {
  return await getCartItemsByCartIdModel(cartId);
};

export const createCartItem = async (cartItemData: Omit<CartItem, 'id_cart_item' | 'add_at'>): Promise<string> => {
  return await createCartItemModel(cartItemData);
};

export const updateCartItem = async (id: string, cartItemData: Partial<Omit<CartItem, 'id_cart_item' | 'add_at'>>): Promise<boolean> => {
  return await updateCartItemModel(id, cartItemData);
};

export const deleteCartItem = async (id: string): Promise<boolean> => {
  return await deleteCartItemModel(id);
};

