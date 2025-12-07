import type { Request, Response } from 'express';
import {
  getAllAffiliations,
  getAffiliationById,
  getAffiliationsByUserId,
  createAffiliation,
  updateAffiliation,
  deleteAffiliation,
} from '../../services/users/affiliation.service';

export const getAllAffiliationsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const affiliations = await getAllAffiliations();
    res.status(200).json({ success: true, data: affiliations });
  } catch (error) {
    console.error('Error fetching affiliations:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getAffiliationByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid affiliation ID' });
      return;
    }
    const affiliation = await getAffiliationById(id);
    if (!affiliation) {
      res.status(404).json({ success: false, error: 'Affiliation not found' });
      return;
    }
    res.status(200).json({ success: true, data: affiliation });
  } catch (error) {
    console.error('Error fetching affiliation:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getAffiliationsByUserIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    if (!userId || userId.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid user ID' });
      return;
    }
    const affiliations = await getAffiliationsByUserId(userId);
    res.status(200).json({ success: true, data: affiliations });
  } catch (error) {
    console.error('Error fetching affiliations by user:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createAffiliationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const affiliationData = req.body;
    const id = await createAffiliation(affiliationData);
    res.status(201).json({
      success: true,
      data: { id_affiliation: id },
      message: 'Affiliation created successfully',
    });
  } catch (error) {
    console.error('Error creating affiliation:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateAffiliationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const affiliationData = req.body;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid affiliation ID' });
      return;
    }
    const updated = await updateAffiliation(id, affiliationData);
    if (!updated) {
      res.status(404).json({ success: false, error: 'Affiliation not found or no changes made' });
      return;
    }
    res.status(200).json({ success: true, message: 'Affiliation updated successfully' });
  } catch (error) {
    console.error('Error updating affiliation:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteAffiliationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id || id.trim() === '') {
      res.status(400).json({ success: false, error: 'Invalid affiliation ID' });
      return;
    }
    const deleted = await deleteAffiliation(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Affiliation not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Affiliation deleted successfully' });
  } catch (error) {
    console.error('Error deleting affiliation:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

