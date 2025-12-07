import { SubscriptionType } from '../users/subscriptionType';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  subscription_type?: SubscriptionType;
  fk_id_role?: string | null;
}

export interface AuthResponse {
  token: string;
  user: {
    id_user: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    subscription_type: SubscriptionType;
    wallet_balance: number;
    language_preference: string | null;
    provider: string;
    fk_id_role: string | null;
  };
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

