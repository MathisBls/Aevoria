export interface User {
  id_user: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password_hash: string;
  password_salt: string;
  subscription_type: string;
  wallet_balance: number;
  language_preference: string | null;
  provider: string;
  created_at: Date | null;
  fk_id_role: string | null;
}