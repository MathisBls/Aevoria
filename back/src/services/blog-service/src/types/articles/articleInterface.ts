export interface Article {
  id_articles: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: Date | null;
  fk_id_author: string | null;
  fk_id_category: string | null;
}

