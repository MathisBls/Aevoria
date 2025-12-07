import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import reviewRoutes from './routes/reviews/review.routes';
import wishlistRoutes from './routes/wishlist/wishlist.routes';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

// CORS
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
      title: 'Review Service API',
      version: '1.0.0',
      description: 'Review Service API Documentation',
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

// Middleware pour modifier dynamiquement l'URL du serveur Swagger
app.get('/api-docs/review-service/swagger.json', (req: Request, res: Response) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const baseUrl = `${protocol}://${host}`;
  
  const dynamicSpec = {
    ...swaggerSpecs,
    servers: [
      {
        url: baseUrl,
        description: 'Review Service',
      },
    ],
  };
  
  res.setHeader('Content-Type', 'application/json');
  res.send(dynamicSpec);
});

const swaggerUiHandler = swaggerUi.setup(null, {
  explorer: true,
  customSiteTitle: 'Review Service API Docs',
  swaggerOptions: {
    url: '/api-docs/review-service/swagger.json',
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

app.use('/api-docs/review-service', swaggerUi.serve, swaggerUiHandler);

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', service: 'review-service', timestamp: new Date().toISOString() });
});

app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlists', wishlistRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    service: 'review-service',
  });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred',
    service: 'review-service',
  });
});

server.listen(PORT, () => {
  console.log(`Review service running on port ${PORT}`);
  console.log(`Review Service API docs: http://localhost:${PORT}/api-docs/review-service`);
  console.log(`Review Service health: http://localhost:${PORT}/health`);
});

export default app;

