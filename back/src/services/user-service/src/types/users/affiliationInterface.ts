export interface Affiliation {
  id_affiliation: string;
  refferal_code: string;
  earning: number;
  create_at: Date | null;
  fk_id_user: string | null;
}

