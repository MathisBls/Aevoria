import {
  getAllCarts as getAllCartsModel,
  getCartById as getCartByIdModel,
  getCartsByUserId as getCartsByUserIdModel,
  createCart as createCartModel,
  updateCart as updateCartModel,
  deleteCart as deleteCartModel,
} from '../../models/cart/cart.model';
import type { Cart } from '../../types/cart/cartInterface';

export const getAllCarts = async (): Promise<Cart[]> => {
  return await getAllCartsModel();
};

export const getCartById = async (id: string): Promise<Cart | null> => {
  return await getCartByIdModel(id);
};

export const getCartsByUserId = async (userId: string): Promise<Cart[]> => {
  return await getCartsByUserIdModel(userId);
};

export const createCart = async (cartData: Omit<Cart, 'id_cart' | 'created_at'>): Promise<string> => {
  return await createCartModel(cartData);
};

export const updateCart = async (id: string, cartData: Partial<Omit<Cart, 'id_cart' | 'created_at'>>): Promise<boolean> => {
  return await updateCartModel(id, cartData);
};

export const deleteCart = async (id: string): Promise<boolean> => {
  return await deleteCartModel(id);
};

