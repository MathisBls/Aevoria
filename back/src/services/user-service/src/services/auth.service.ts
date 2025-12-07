import bcrypt from 'bcrypt';
import { getUserById, getUserByEmail, createUser } from '../models/users/user.model';
import { generateToken } from '../utils/jwt.util';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/auth/authInterface';
import { User } from '../types/users/userInterface';
import { SubscriptionType } from '../types/users/subscriptionType';

export const login = async (loginData: LoginRequest): Promise<AuthResponse> => {
  const user = await getUserByEmail(loginData.email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(loginData.password, user.password_hash);
  
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user.id_user, user.email);

  return {
    token,
    user: {
      id_user: user.id_user,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      subscription_type: user.subscription_type,
      wallet_balance: user.wallet_balance,
      language_preference: user.language_preference,
      provider: user.provider,
      fk_id_role: user.fk_id_role,
    },
  };
};

export const register = async (registerData: RegisterRequest): Promise<AuthResponse> => {
  const existingUser = await getUserByEmail(registerData.email);
  
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const saltRounds = 10;
  const password_hash = await bcrypt.hash(registerData.password, saltRounds);
  const password_salt = bcrypt.genSaltSync(saltRounds);

  const userId = await createUser({
    first_name: registerData.first_name,
    last_name: registerData.last_name,
    username: registerData.username,
    email: registerData.email,
    password_hash,
    password_salt,
    subscription_type: registerData.subscription_type || SubscriptionType.FREE,
    wallet_balance: 0,
    language_preference: null,
    provider: 'local',
    fk_id_role: registerData.fk_id_role || null,
  });

  const user = await getUserById(userId);
  
  if (!user) {
    throw new Error('Failed to create user');
  }

  const token = generateToken(user.id_user, user.email);

  return {
    token,
    user: {
      id_user: user.id_user,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      subscription_type: user.subscription_type,
      wallet_balance: user.wallet_balance,
      language_preference: user.language_preference,
      provider: user.provider,
      fk_id_role: user.fk_id_role,
    },
  };
};

export const getMe = async (userId: string): Promise<Omit<User, 'password_hash' | 'password_salt'>> => {
  const user = await getUserById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  const { password_hash: _password_hash, password_salt: _password_salt, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

