import { Router } from 'express';
import {
  getAllNewsletterSubscriptionsController,
  getNewsletterSubscriptionByIdController,
  getNewsletterSubscriptionsByUserIdController,
  createNewsletterSubscriptionController,
  updateNewsletterSubscriptionController,
  deleteNewsletterSubscriptionController,
} from '../../controllers/users/newsletterSubscription.controller';

const router = Router();

/**
 * @swagger
 * /api/newsletter-subscriptions:
 *   get:
 *     summary: Get all newsletter subscriptions
 *     tags: [NewsletterSubscriptions]
 *     responses:
 *       200:
 *         description: List of all newsletter subscriptions
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new newsletter subscription
 *     tags: [NewsletterSubscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newsletter_token
 *             properties:
 *               newsletter_token:
 *                 type: string
 *               status:
 *                 type: number
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Newsletter subscription created successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllNewsletterSubscriptionsController);
router.post('/', createNewsletterSubscriptionController);

/**
 * @swagger
 * /api/newsletter-subscriptions/user/{userId}:
 *   get:
 *     summary: Get newsletter subscriptions by user ID
 *     tags: [NewsletterSubscriptions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID (UUID)
 *     responses:
 *       200:
 *         description: List of newsletter subscriptions for the user
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userId', getNewsletterSubscriptionsByUserIdController);

/**
 * @swagger
 * /api/newsletter-subscriptions/{id}:
 *   get:
 *     summary: Get newsletter subscription by ID
 *     tags: [NewsletterSubscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Newsletter subscription ID (UUID)
 *     responses:
 *       200:
 *         description: Newsletter subscription details
 *       400:
 *         description: Invalid subscription ID
 *       404:
 *         description: Newsletter subscription not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update newsletter subscription by ID
 *     tags: [NewsletterSubscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Newsletter subscription ID (UUID)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newsletter_token:
 *                 type: string
 *               status:
 *                 type: number
 *               fk_id_user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Newsletter subscription updated successfully
 *       400:
 *         description: Invalid subscription ID
 *       404:
 *         description: Newsletter subscription not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete newsletter subscription by ID
 *     tags: [NewsletterSubscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Newsletter subscription ID (UUID)
 *     responses:
 *       200:
 *         description: Newsletter subscription deleted successfully
 *       400:
 *         description: Invalid subscription ID
 *       404:
 *         description: Newsletter subscription not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getNewsletterSubscriptionByIdController);
router.patch('/:id', updateNewsletterSubscriptionController);
router.delete('/:id', deleteNewsletterSubscriptionController);

export default router;

