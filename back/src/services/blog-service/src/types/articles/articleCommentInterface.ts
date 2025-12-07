export interface ArticleComment {
  id_article_comments: string;
  comment_text: string;
  created_at: Date | null;
  fk_id_articles: string | null;
}

