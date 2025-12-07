import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import userRoutes from './routes/users/user.routes';
import roleRoutes from './routes/roles/role.routes';
import affiliationRoutes from './routes/users/affiliation.routes';
import walletTransactionRoutes from './routes/users/walletTransaction.routes';
import friendRoutes from './routes/friends/friend.routes';
import friendAliasRoutes from './routes/friends/friendAlias.routes';
import messageRoutes from './routes/messages/message.routes';
import notificationRoutes from './routes/notifications/notification.routes';
import userNotificationRoutes from './routes/notifications/userNotification.routes';
import newsletterSubscriptionRoutes from './routes/users/newsletterSubscription.routes';
import authRoutes from './routes/auth.routes';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
      'http://localhost:3005',
    ],
    credentials: true,
  }),
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Service API',
      version: '1.0.0',
      description: 'User Service API Documentation',
    },
    servers: [],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/**/*.ts', './src/models/**/*.ts', './src/index.ts'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

app.get('/api-docs/user-service/swagger.json', (req: Request, res: Response) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const baseUrl = `${protocol}://${host}`;
  
  const dynamicSpec = {
    ...swaggerSpecs,
    servers: [
      {
        url: baseUrl,
        description: 'User Service',
      },
    ],
  };
  
  res.setHeader('Content-Type', 'application/json');
  res.send(dynamicSpec);
});

const swaggerUiHandler = swaggerUi.setup(null, {
  explorer: true,
  customSiteTitle: 'User Service API Docs',
  swaggerOptions: {
    url: '/api-docs/user-service/swagger.json',
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    displayRequestDuration: true,
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
    persistAuthorization: true,
    defaultModelRendering: 'model',
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
    operationsSorter: 'alpha',
    tagsSorter: 'alpha',
  },
  customCss: '.swagger-ui .topbar { display: none }',
});

app.use('/api-docs/user-service', swaggerUi.serve, swaggerUiHandler);

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', service: 'user-service', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/affiliations', affiliationRoutes);
app.use('/api/wallet-transactions', walletTransactionRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/friend-aliases', friendAliasRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/user-notifications', userNotificationRoutes);
app.use('/api/newsletter-subscriptions', newsletterSubscriptionRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    service: 'user-service',
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred',
    service: 'user-service',
  });
});

server.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
  console.log(`User Service API docs: http://localhost:${PORT}/api-docs/user-service`);
  console.log(`User Service health: http://localhost:${PORT}/health`);
});

export default app;
