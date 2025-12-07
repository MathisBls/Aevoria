export interface GameMedia {
  id_game_media: string;
  media_type: string | null;
  media_url: string;
  thumbnail_url: string | null;
  uploaded_at: Date | null;
  fk_id_games: string | null;
}

