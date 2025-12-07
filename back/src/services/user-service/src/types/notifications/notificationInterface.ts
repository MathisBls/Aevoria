export interface Notification {
  id_notification: string;
  subject: string | null;
  message: string;
  is_important: boolean;
  notification_type: string | null;
  entity_type: string | null;
  attached_file: string | null;
  created_at: Date | null;
}

