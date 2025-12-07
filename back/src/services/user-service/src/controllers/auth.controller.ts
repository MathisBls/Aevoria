import { type Request, type Response } from 'express';
import { login, register, getMe } from '../services/auth.service';
import { LoginRequest, RegisterRequest } from '../types/auth/authInterface';
import { AuthRequest } from '../middleware/auth.middleware';

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData: LoginRequest = req.body;

    if (!loginData.email || !loginData.password) {
      res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Email and password are required',
      });
      return;
    }

    const result = await login(loginData);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: error instanceof Error ? error.message : 'Login failed',
    });
  }
};

export const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const registerData: RegisterRequest = req.body;

    if (!registerData.email || !registerData.password || !registerData.username || !registerData.first_name || !registerData.last_name) {
      res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'All required fields must be provided',
      });
      return;
    }

    const result = await register(registerData);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Bad Request',
      message: error instanceof Error ? error.message : 'Registration failed',
    });
  }
};

export const getMeController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'User not authenticated',
      });
      return;
    }

    const user = await getMe(req.user.userId);

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: 'Not Found',
      message: error instanceof Error ? error.message : 'User not found',
    });
  }
};

export const logoutController = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

