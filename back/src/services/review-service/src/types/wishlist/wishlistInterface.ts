export interface Wishlist {
  id_wishlist: string;
  add_at: Date | null;
  fk_id_user: string | null;
  fk_id_games: string | null;
}

