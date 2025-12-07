export interface Review {
  id_reviews: string;
  rating: number | null;
  review_text: string | null;
  video_url: string | null;
  created_at: Date | null;
  fk_id_user: string | null;
  fk_id_games: string | null;
}

