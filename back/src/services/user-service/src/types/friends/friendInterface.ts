export interface Friend {
  fk_id_user: string;
  fk_id_friend: string;
  status: string | null;
  create_at: Date | null;
}

