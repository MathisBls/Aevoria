export interface CartItem {
  id_cart_item: string;
  quantity: number;
  add_at: Date | null;
  fk_id_cart: string | null;
  fk_id_games: string | null;
}

