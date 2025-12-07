import type { Request, Response } from 'express';
import {
  getAllWalletTransactions,
  getWalletTransactionById,
  getWalletTransactionsByUserId,
  createWalletTransaction,
  updateWalletTransaction,
  deleteWalletTransaction,
} from '../../services/users/walletTransaction.service';

export const getAllWalletTransactionsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await getAllWalletTransactions();
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error('Error fetching wallet transactions:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getWalletTransactionByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid transaction ID' });
      return;
    }
    const transaction = await getWalletTransactionById(id);
    if (!transaction) {
      res.status(404).json({ success: false, error: 'Transaction not found' });
      return;
    }
    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getWalletTransactionsByUserIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID' });
      return;
    }
    const transactions = await getWalletTransactionsByUserId(userId);
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.error('Error fetching transactions by user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createWalletTransactionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactionData = req.body;
    const id = await createWalletTransaction(transactionData);
    res.status(201).json({
      success: true,
      data: { id_wallet_transaction: id },
      message: 'Transaction created successfully',
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateWalletTransactionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const transactionData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid transaction ID' });
      return;
    }
    const updated = await updateWalletTransaction(id, transactionData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Transaction not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Transaction updated successfully' });
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteWalletTransactionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid transaction ID' });
      return;
    }
    const deleted = await deleteWalletTransaction(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Transaction not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

