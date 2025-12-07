import pool from '../../db/config';
import { NewsletterSubscription } from '../../types/users/newsletterSubscriptionInterface';

export const getAllNewsletterSubscriptions = async (): Promise<NewsletterSubscription[]> => {
  const [rows] = await pool.execute(
    'SELECT id_newsletter_subscription, newsletter_token, status, subscribed_at, fk_id_user FROM newsletter_subscription'
  );
  return rows as NewsletterSubscription[];
};

export const getNewsletterSubscriptionById = async (id: string): Promise<NewsletterSubscription | null> => {
  const [rows] = await pool.execute(
    'SELECT id_newsletter_subscription, newsletter_token, status, subscribed_at, fk_id_user FROM newsletter_subscription WHERE id_newsletter_subscription = ?',
    [id]
  );
  return (rows as NewsletterSubscription[])[0] || null;
};

export const getNewsletterSubscriptionsByUserId = async (userId: string): Promise<NewsletterSubscription[]> => {
  const [rows] = await pool.execute(
    'SELECT id_newsletter_subscription, newsletter_token, status, subscribed_at, fk_id_user FROM newsletter_subscription WHERE fk_id_user = ?',
    [userId]
  );
  return rows as NewsletterSubscription[];
};

export const createNewsletterSubscription = async (subscriptionData: Omit<NewsletterSubscription, 'id_newsletter_subscription' | 'subscribed_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO newsletter_subscription (id_newsletter_subscription, newsletter_token, status, fk_id_user) VALUES (UUID(), ?, ?, ?)',
    [subscriptionData.newsletter_token, subscriptionData.status, subscriptionData.fk_id_user]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_newsletter_subscription FROM newsletter_subscription WHERE fk_id_user = ? ORDER BY subscribed_at DESC LIMIT 1',
    [subscriptionData.fk_id_user]
  );
  return (rows as { id_newsletter_subscription: string }[])[0]?.id_newsletter_subscription || '';
};

export const updateNewsletterSubscription = async (id: string, subscriptionData: Partial<Omit<NewsletterSubscription, 'id_newsletter_subscription' | 'subscribed_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (subscriptionData.newsletter_token !== undefined) {
    fields.push('newsletter_token = ?');
    values.push(subscriptionData.newsletter_token);
  }
  if (subscriptionData.status !== undefined) {
    fields.push('status = ?');
    values.push(subscriptionData.status);
  }
  if (subscriptionData.fk_id_user !== undefined) {
    fields.push('fk_id_user = ?');
    values.push(subscriptionData.fk_id_user);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE newsletter_subscription SET ${fields.join(', ')} WHERE id_newsletter_subscription = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteNewsletterSubscription = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM newsletter_subscription WHERE id_newsletter_subscription = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

