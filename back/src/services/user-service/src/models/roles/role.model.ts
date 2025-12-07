import pool from '../../db/config';
import { Role } from '../../types/roles/roleInterface';

export const getAllRoles = async (): Promise<Role[]> => {
  const [rows] = await pool.execute('SELECT id_role, name FROM roles');
  return rows as Role[];
};

export const getRoleById = async (id: string): Promise<Role | null> => {
  const [rows] = await pool.execute('SELECT id_role, name FROM roles WHERE id_role = ?', [id]);
  return (rows as Role[])[0] || null;
};

export const createRole = async (roleData: Omit<Role, 'id_role'>): Promise<string> => {
  await pool.execute(
    'INSERT INTO roles (id_role, name) VALUES (UUID(), ?)',
    [roleData.name]
  );
  
  const [rows] = await pool.execute(
    'SELECT id_role FROM roles WHERE name = ? ORDER BY id_role DESC LIMIT 1',
    [roleData.name]
  );
  return (rows as { id_role: string }[])[0]?.id_role || '';
};

export const updateRole = async (id: string, roleData: Partial<Omit<Role, 'id_role'>>): Promise<boolean> => {
  const fields: string[] = [];
  const values: unknown[] = [];

  if (roleData.name !== undefined) {
    fields.push('name = ?');
    values.push(roleData.name);
  }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE roles SET ${fields.join(', ')} WHERE id_role = ?`,
    values
  ) as [{ affectedRows: number }, unknown];

  return result.affectedRows > 0;
};

export const deleteRole = async (id: string): Promise<boolean> => {
  const [result] = await pool.execute('DELETE FROM roles WHERE id_role = ?', [id]) as [{ affectedRows: number }, unknown];
  return result.affectedRows > 0;
};

