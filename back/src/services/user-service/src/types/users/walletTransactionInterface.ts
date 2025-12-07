export interface WalletTransaction {
  id_wallet_transaction: string;
  amount: number;
  type_transaction: string;
  date_transaction: Date | null;
  fk_id_user: string | null;
}

