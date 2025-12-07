export interface NewsletterSubscription {
  id_newsletter_subscription: string;
  newsletter_token: string;
  status: number;
  subscribed_at: Date | null;
  fk_id_user: string | null;
}

