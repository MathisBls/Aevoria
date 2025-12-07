import {
  getAllAffiliations as getAllAffiliationsModel,
  getAffiliationById as getAffiliationByIdModel,
  getAffiliationsByUserId as getAffiliationsByUserIdModel,
  createAffiliation as createAffiliationModel,
  updateAffiliation as updateAffiliationModel,
  deleteAffiliation as deleteAffiliationModel,
} from '../../models/users/affiliation.model';
import type { Affiliation } from '../../types/users/affiliationInterface';

export const getAllAffiliations = async (): Promise<Affiliation[]> => {
  return await getAllAffiliationsModel();
};

export const getAffiliationById = async (id: string): Promise<Affiliation | null> => {
  return await getAffiliationByIdModel(id);
};

export const getAffiliationsByUserId = async (userId: string): Promise<Affiliation[]> => {
  return await getAffiliationsByUserIdModel(userId);
};

export const createAffiliation = async (affiliationData: Omit<Affiliation, 'id_affiliation' | 'create_at'>): Promise<string> => {
  return await createAffiliationModel(affiliationData);
};

export const updateAffiliation = async (id: string, affiliationData: Partial<Omit<Affiliation, 'id_affiliation' | 'create_at'>>): Promise<boolean> => {
  return await updateAffiliationModel(id, affiliationData);
};

export const deleteAffiliation = async (id: string): Promise<boolean> => {
  return await deleteAffiliationModel(id);
};

