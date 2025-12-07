import pool from '../../db/config';
import { Affiliation } from '../../types/users/affiliationInterface';

export const getAllAffiliations = async (): Promise<Affiliation[]> => {
  const [rows] = await pool.execute(
    'SELECT id_affiliation, refferal_code, earning, create_at, fk_id_user FROM affiliation'
  );
  return rows as Affiliation[];
};

export const getAffiliationById = async (id: string): Promise<Affiliation | null> => {
  const [rows] = await pool.execute(
    'SELECT id_affiliation, refferal_code, earning, create_at, fk_id_user FROM affiliation WHERE id_affiliation = ?',
    [id]
  );
  return (rows as Affiliation[])[0] || null;
};

export const getAffiliationsByUserId = async (userId: string): Promise<Affiliation[]> => {
  const [rows] = await pool.execute(
    'SELECT id_affiliation, refferal_code, earning, create_at, fk_id_user FROM affiliation WHERE fk_id_user = ?',
    [userId]
  );
  return rows as Affiliation[];
};

export const createAffiliation = async (affiliationData: Omit<Affiliation, 'id_affiliation' | 'create_at'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO affiliation (id_affiliation, refferal_code, earning, fk_id_user) VALUES (UUID(), ?, ?, ?)',
    [affiliationData.refferal_code, affiliationData.earning, affiliationData.fk_id_user]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_affiliation FROM affiliation WHERE refferal_code = ? ORDER BY create_at DESC LIMIT 1',
    [affiliationData.refferal_code]
  );
  return (rows as { id_affiliation: string }[])[0]?.id_affiliation || '';
};

export const updateAffiliation = async (id: string, affiliationData: Partial<Omit<Affiliation, 'id_affiliation' | 'create_at'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (affiliationData.refferal_code !== undefined) {
    fields.push('refferal_code = ?');
    values.push(affiliationData.refferal_code);
  }
  if (affiliationData.earning !== undefined) {
    fields.push('earning = ?');
    values.push(affiliationData.earning);
  }
  if (affiliationData.fk_id_user !== undefined) {
    fields.push('fk_id_user = ?');
    values.push(affiliationData.fk_id_user);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE affiliation SET ${fields.join(', ')} WHERE id_affiliation = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteAffiliation = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM affiliation WHERE id_affiliation = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

