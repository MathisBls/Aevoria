import type { Request, Response } from 'express';
import {
  getAllNewsletterSubscriptions,
  getNewsletterSubscriptionById,
  getNewsletterSubscriptionsByUserId,
  createNewsletterSubscription,
  updateNewsletterSubscription,
  deleteNewsletterSubscription,
} from '../../services/users/newsletterSubscription.service';

export const getAllNewsletterSubscriptionsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const subscriptions = await getAllNewsletterSubscriptions();
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getNewsletterSubscriptionByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid subscription ID' });
      return;
    }
    const subscription = await getNewsletterSubscriptionById(id);
    if (!subscription) {
      res.status(404).json({ success: false, error: 'Newsletter subscription not found' });
      return;
    }
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    console.error('Error fetching newsletter subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getNewsletterSubscriptionsByUserIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID' });
      return;
    }
    const subscriptions = await getNewsletterSubscriptionsByUserId(userId);
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    console.error('Error fetching newsletter subscriptions by user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createNewsletterSubscriptionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const subscriptionData = req.body;
    const id = await createNewsletterSubscription(subscriptionData);
    res.status(201).json({
      success: true,
      data: { id_newsletter_subscription: id },
      message: 'Newsletter subscription created successfully',
    });
  } catch (error) {
    console.error('Error creating newsletter subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateNewsletterSubscriptionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const subscriptionData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid subscription ID' });
      return;
    }
    const updated = await updateNewsletterSubscription(id, subscriptionData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Newsletter subscription not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Newsletter subscription updated successfully' });
  } catch (error) {
    console.error('Error updating newsletter subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteNewsletterSubscriptionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid subscription ID' });
      return;
    }
    const deleted = await deleteNewsletterSubscription(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Newsletter subscription not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Newsletter subscription deleted successfully' });
  } catch (error) {
    console.error('Error deleting newsletter subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

