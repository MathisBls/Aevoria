import {
  getAllWalletTransactions as getAllWalletTransactionsModel,
  getWalletTransactionById as getWalletTransactionByIdModel,
  getWalletTransactionsByUserId as getWalletTransactionsByUserIdModel,
  createWalletTransaction as createWalletTransactionModel,
  updateWalletTransaction as updateWalletTransactionModel,
  deleteWalletTransaction as deleteWalletTransactionModel,
} from '../../models/users/walletTransaction.model';
import type { WalletTransaction } from '../../types/users/walletTransactionInterface';

export const getAllWalletTransactions = async (): Promise<WalletTransaction[]> => {
  return await getAllWalletTransactionsModel();
};

export const getWalletTransactionById = async (id: string): Promise<WalletTransaction | null> => {
  return await getWalletTransactionByIdModel(id);
};

export const getWalletTransactionsByUserId = async (userId: string): Promise<WalletTransaction[]> => {
  return await getWalletTransactionsByUserIdModel(userId);
};

export const createWalletTransaction = async (transactionData: Omit<WalletTransaction, 'id_wallet_transaction' | 'date_transaction'>): Promise<string> => {
  return await createWalletTransactionModel(transactionData);
};

export const updateWalletTransaction = async (id: string, transactionData: Partial<Omit<WalletTransaction, 'id_wallet_transaction'>>): Promise<boolean> => {
  return await updateWalletTransactionModel(id, transactionData);
};

export const deleteWalletTransaction = async (id: string): Promise<boolean> => {
  return await deleteWalletTransactionModel(id);
};

