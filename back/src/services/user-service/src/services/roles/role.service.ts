import {
  getAllRoles as getAllRolesModel,
  getRoleById as getRoleByIdModel,
  createRole as createRoleModel,
  updateRole as updateRoleModel,
  deleteRole as deleteRoleModel,
} from '../../models/roles/role.model';
import type { Role } from '../../types/roles/roleInterface';

export const getAllRoles = async (): Promise<Role[]> => {
  return await getAllRolesModel();
};

export const getRoleById = async (id: string): Promise<Role | null> => {
  return await getRoleByIdModel(id);
};

export const createRole = async (roleData: Omit<Role, 'id_role'>): Promise<string> => {
  return await createRoleModel(roleData);
};

export const updateRole = async (id: string, roleData: Partial<Omit<Role, 'id_role'>>): Promise<boolean> => {
  return await updateRoleModel(id, roleData);
};

export const deleteRole = async (id: string): Promise<boolean> => {
  return await deleteRoleModel(id);
};

