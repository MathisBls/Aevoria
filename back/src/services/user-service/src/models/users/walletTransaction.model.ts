import pool from '../../db/config';
import { WalletTransaction } from '../../types/users/walletTransactionInterface';

export const getAllWalletTransactions = async (): Promise<WalletTransaction[]> => {
  const [rows] = await pool.execute(
    'SELECT id_wallet_transaction, amount, type_transaction, date_transaction, fk_id_user FROM wallet_transaction'
  );
  return rows as WalletTransaction[];
};

export const getWalletTransactionById = async (id: string): Promise<WalletTransaction | null> => {
  const [rows] = await pool.execute(
    'SELECT id_wallet_transaction, amount, type_transaction, date_transaction, fk_id_user FROM wallet_transaction WHERE id_wallet_transaction = ?',
    [id]
  );
  return (rows as WalletTransaction[])[0] || null;
};

export const getWalletTransactionsByUserId = async (userId: string): Promise<WalletTransaction[]> => {
  const [rows] = await pool.execute(
    'SELECT id_wallet_transaction, amount, type_transaction, date_transaction, fk_id_user FROM wallet_transaction WHERE fk_id_user = ?',
    [userId]
  );
  return rows as WalletTransaction[];
};

export const createWalletTransaction = async (transactionData: Omit<WalletTransaction, 'id_wallet_transaction' | 'date_transaction'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO wallet_transaction (id_wallet_transaction, amount, type_transaction, fk_id_user) VALUES (UUID(), ?, ?, ?)',
    [transactionData.amount, transactionData.type_transaction, transactionData.fk_id_user]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_wallet_transaction FROM wallet_transaction WHERE fk_id_user = ? ORDER BY date_transaction DESC LIMIT 1',
    [transactionData.fk_id_user]
  );
  return (rows as { id_wallet_transaction: string }[])[0]?.id_wallet_transaction || '';
};

export const updateWalletTransaction = async (id: string, transactionData: Partial<Omit<WalletTransaction, 'id_wallet_transaction'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (transactionData.amount !== undefined) {
    fields.push('amount = ?');
    values.push(transactionData.amount);
  }
  if (transactionData.type_transaction !== undefined) {
    fields.push('type_transaction = ?');
    values.push(transactionData.type_transaction);
  }
  if (transactionData.date_transaction !== undefined) {
    fields.push('date_transaction = ?');
    values.push(transactionData.date_transaction);
  }
  if (transactionData.fk_id_user !== undefined) {
    fields.push('fk_id_user = ?');
    values.push(transactionData.fk_id_user);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE wallet_transaction SET ${fields.join(', ')} WHERE id_wallet_transaction = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteWalletTransaction = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM wallet_transaction WHERE id_wallet_transaction = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

