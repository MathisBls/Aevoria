export interface Order {
  id_order: string;
  total_price: number;
  order_date: Date | null;
  status: string | null;
  payment_method: string;
  currency: string;
  updated_at: Date | null;
  fk_id_user: string | null;
}

