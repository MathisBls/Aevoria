export interface OrderItem {
  id_order_item: string;
  quantity: number;
  price: number;
  fk_id_order: string | null;
  fk_id_games: string | null;
}

