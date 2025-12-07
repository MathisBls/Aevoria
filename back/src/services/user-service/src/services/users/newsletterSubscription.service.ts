import {
  getAllNewsletterSubscriptions as getAllNewsletterSubscriptionsModel,
  getNewsletterSubscriptionById as getNewsletterSubscriptionByIdModel,
  getNewsletterSubscriptionsByUserId as getNewsletterSubscriptionsByUserIdModel,
  createNewsletterSubscription as createNewsletterSubscriptionModel,
  updateNewsletterSubscription as updateNewsletterSubscriptionModel,
  deleteNewsletterSubscription as deleteNewsletterSubscriptionModel,
} from '../../models/users/newsletterSubscription.model';
import type { NewsletterSubscription } from '../../types/users/newsletterSubscriptionInterface';

export const getAllNewsletterSubscriptions = async (): Promise<NewsletterSubscription[]> => {
  return await getAllNewsletterSubscriptionsModel();
};

export const getNewsletterSubscriptionById = async (id: string): Promise<NewsletterSubscription | null> => {
  return await getNewsletterSubscriptionByIdModel(id);
};

export const getNewsletterSubscriptionsByUserId = async (userId: string): Promise<NewsletterSubscription[]> => {
  return await getNewsletterSubscriptionsByUserIdModel(userId);
};

export const createNewsletterSubscription = async (subscriptionData: Omit<NewsletterSubscription, 'id_newsletter_subscription' | 'subscribed_at'>): Promise<string> => {
  return await createNewsletterSubscriptionModel(subscriptionData);
};

export const updateNewsletterSubscription = async (id: string, subscriptionData: Partial<Omit<NewsletterSubscription, 'id_newsletter_subscription' | 'subscribed_at'>>): Promise<boolean> => {
  return await updateNewsletterSubscriptionModel(id, subscriptionData);
};

export const deleteNewsletterSubscription = async (id: string): Promise<boolean> => {
  return await deleteNewsletterSubscriptionModel(id);
};

