export interface FriendAlias {
  id_friend_aliases: string;
  custom_name: string;
  create_at: Date | null;
  fk_id_user: string | null;
  fk_id_friend: string | null;
}

