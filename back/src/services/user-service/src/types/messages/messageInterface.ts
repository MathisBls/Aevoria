export interface Message {
  id_messages: string;
  content: string | null;
  message_type: string;
  create_at: Date | null;
  fk_id_user_send: string | null;
  fk_id_user_received: string | null;
}

