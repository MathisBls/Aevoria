export interface Game {
  id_games: string;
  title: string;
  description: string | null;
  banner_url: string | null;
  thumbnail_url: string | null;
  price: number;
  discount: number;
  release_date: Date | null;
  installation_notes: string | null;
  ratings: number;
  reviews_count: number;
  created_at: Date | null;
  fk_id_user: string | null;
}

