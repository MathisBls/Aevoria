import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { createServer } from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

// CORS
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
    ],
    credentials: true,
  }),
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Aevoria API Gateway',
      version: '1.0.0',
      description: 'API Gateway for Aevoria microservices',
    },
    servers: [
      {
        url: '/',
        description: 'API Gateway (relative URL)',
      },
    ],
  },
  apis: ['./src/index.ts'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);
const swaggerUiHandler = swaggerUi.setup(swaggerSpecs, {
  explorer: true,
  customSiteTitle: 'Aevoria API Gateway Docs',
});

app.use('/api-docs', swaggerUi.serve, swaggerUiHandler);

// Home page with services overview
app.get('/', (_req: Request, res: Response) => {
  const services = [
    {
      name: 'API Gateway',
      port: 3000,
      swagger: 'http://localhost:3000/api-docs',
      health: 'http://localhost:3000/health',
      description: 'Central entry point for all microservices',
    },
    {
      name: 'User Service',
      port: 3001,
      swagger: 'http://localhost:3001/api-docs/user-service',
      health: 'http://localhost:3001/health',
      description: 'User management, roles, affiliations, wallet, friends, messages, notifications',
      endpoints: ['/api/users', '/api/roles', '/api/affiliations', '/api/wallet-transactions', '/api/friends', '/api/messages', '/api/notifications'],
    },
    {
      name: 'Catalog Service',
      port: 3002,
      swagger: 'http://localhost:3002/api-docs/catalog-service',
      health: 'http://localhost:3002/health',
      description: 'Games, genres, tags, and media management',
      endpoints: ['/api/games', '/api/genres', '/api/tags', '/api/game-genres', '/api/game-tags', '/api/game-medias'],
    },
    {
      name: 'Order Service',
      port: 3003,
      swagger: 'http://localhost:3003/api-docs/order-service',
      health: 'http://localhost:3003/health',
      description: 'Cart, orders, and order items management',
      endpoints: ['/api/carts', '/api/cart-items', '/api/orders', '/api/order-items'],
    },
    {
      name: 'Review Service',
      port: 3004,
      swagger: 'http://localhost:3004/api-docs/review-service',
      health: 'http://localhost:3004/health',
      description: 'Reviews and wishlist management',
      endpoints: ['/api/reviews', '/api/wishlists'],
    },
    {
      name: 'Blog Service',
      port: 3005,
      swagger: 'http://localhost:3005/api-docs/blog-service',
      health: 'http://localhost:3005/health',
      description: 'Articles, categories, and comments management',
      endpoints: ['/api/articles', '/api/article-categories', '/api/article-comments', '/api/user-article-comments'],
    },
  ];

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aevoria - Services Overview</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: white;
            text-align: center;
            margin-bottom: 10px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle {
            color: rgba(255,255,255,0.9);
            text-align: center;
            margin-bottom: 30px;
            font-size: 1.1em;
        }
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .service-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.3);
        }
        .service-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 2px solid #f0f0f0;
        }
        .service-name {
            font-size: 1.5em;
            font-weight: bold;
            color: #333;
        }
        .service-port {
            background: #667eea;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: bold;
        }
        .service-description {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        .service-links {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-bottom: 15px;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
            font-size: 0.9em;
        }
        .btn-primary {
            background: #667eea;
            color: white;
        }
        .btn-primary:hover {
            background: #5568d3;
            transform: scale(1.05);
        }
        .btn-secondary {
            background: #48bb78;
            color: white;
        }
        .btn-secondary:hover {
            background: #38a169;
            transform: scale(1.05);
        }
        .endpoints {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #e0e0e0;
        }
        .endpoints-title {
            font-size: 0.9em;
            color: #888;
            margin-bottom: 8px;
            font-weight: bold;
        }
        .endpoint-list {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
        .endpoint {
            background: #f7f7f7;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 0.85em;
            color: #555;
            font-family: 'Courier New', monospace;
        }
        .footer {
            text-align: center;
            color: white;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255,255,255,0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Aevoria Services</h1>
        <p class="subtitle">Microservices Architecture - Overview & Documentation</p>
        
        <div class="services-grid">
            ${services.map(service => `
                <div class="service-card">
                    <div class="service-header">
                        <div class="service-name">${service.name}</div>
                        <div class="service-port">Port ${service.port}</div>
                    </div>
                    <div class="service-description">${service.description}</div>
                    <div class="service-links">
                        <a href="${service.swagger}" target="_blank" class="btn btn-primary">Swagger Docs</a>
                        <a href="${service.health}" target="_blank" class="btn btn-secondary">Health Check</a>
                    </div>
                    ${service.endpoints ? `
                        <div class="endpoints">
                            <div class="endpoints-title">Available Endpoints:</div>
                            <div class="endpoint-list">
                                ${service.endpoints.map(endpoint => `<span class="endpoint">${endpoint}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
        
        <div class="footer">
            <p>All services are running on Docker Compose</p>
            <p style="margin-top: 10px; font-size: 0.9em; opacity: 0.8;">
                API Gateway: <a href="http://localhost:3000" style="color: white;">http://localhost:3000</a>
            </p>
        </div>
    </div>
</body>
</html>
  `;

  res.send(html);
});

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'healthy', 
    service: 'api-gateway', 
    timestamp: new Date().toISOString() 
  });
});

// Proxy routes to microservices
const services = {
  user: process.env.USER_SERVICE_URL || 'http://user-service:3000',
  catalog: process.env.CATALOG_SERVICE_URL || 'http://catalog-service:3000',
  order: process.env.ORDER_SERVICE_URL || 'http://order-service:3000',
  review: process.env.REVIEW_SERVICE_URL || 'http://review-service:3000',
  blog: process.env.BLOG_SERVICE_URL || 'http://blog-service:3000',
};

// User Service Proxy
app.use('/api/users', createProxyMiddleware({
  target: services.user,
  changeOrigin: true,
}));
app.use('/api/roles', createProxyMiddleware({
  target: services.user,
  changeOrigin: true,
}));
app.use('/api/affiliations', createProxyMiddleware({
  target: services.user,
  changeOrigin: true,
}));
app.use('/api/wallet-transactions', createProxyMiddleware({
  target: services.user,
  changeOrigin: true,
}));
app.use('/api/friends', createProxyMiddleware({
  target: services.user,
  changeOrigin: true,
}));
app.use('/api/friend-aliases', createProxyMiddleware({
  target: services.user,
  changeOrigin: true,
}));
app.use('/api/messages', createProxyMiddleware({
  target: services.user,
  changeOrigin: true,
}));
app.use('/api/notifications', createProxyMiddleware({
  target: services.user,
  changeOrigin: true,
}));
app.use('/api/user-notifications', createProxyMiddleware({
  target: services.user,
  changeOrigin: true,
}));
app.use('/api/newsletter-subscriptions', createProxyMiddleware({
  target: services.user,
  changeOrigin: true,
}));

// Catalog Service Proxy
app.use('/api/games', createProxyMiddleware({
  target: services.catalog,
  changeOrigin: true,
}));
app.use('/api/genres', createProxyMiddleware({
  target: services.catalog,
  changeOrigin: true,
}));
app.use('/api/tags', createProxyMiddleware({
  target: services.catalog,
  changeOrigin: true,
}));
app.use('/api/game-genres', createProxyMiddleware({
  target: services.catalog,
  changeOrigin: true,
}));
app.use('/api/game-tags', createProxyMiddleware({
  target: services.catalog,
  changeOrigin: true,
}));
app.use('/api/game-medias', createProxyMiddleware({
  target: services.catalog,
  changeOrigin: true,
}));

// Order Service Proxy
app.use('/api/carts', createProxyMiddleware({
  target: services.order,
  changeOrigin: true,
}));
app.use('/api/cart-items', createProxyMiddleware({
  target: services.order,
  changeOrigin: true,
}));
app.use('/api/orders', createProxyMiddleware({
  target: services.order,
  changeOrigin: true,
}));
app.use('/api/order-items', createProxyMiddleware({
  target: services.order,
  changeOrigin: true,
}));

// Review Service Proxy
app.use('/api/reviews', createProxyMiddleware({
  target: services.review,
  changeOrigin: true,
}));
app.use('/api/wishlists', createProxyMiddleware({
  target: services.review,
  changeOrigin: true,
}));

// Blog Service Proxy
app.use('/api/articles', createProxyMiddleware({
  target: services.blog,
  changeOrigin: true,
}));
app.use('/api/article-categories', createProxyMiddleware({
  target: services.blog,
  changeOrigin: true,
}));
app.use('/api/article-comments', createProxyMiddleware({
  target: services.blog,
  changeOrigin: true,
}));
app.use('/api/user-article-comments', createProxyMiddleware({
  target: services.blog,
  changeOrigin: true,
}));

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    service: 'api-gateway',
  });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred',
    service: 'api-gateway',
  });
});

server.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`\nServices Overview: http://localhost:${PORT}/`);
  console.log(`API Gateway docs: http://localhost:${PORT}/api-docs`);
  console.log(`API Gateway health: http://localhost:${PORT}/health`);
  console.log(`\nDirect Service Links:`);
  console.log(`   User Service:     http://localhost:3001/api-docs/user-service`);
  console.log(`   Catalog Service:  http://localhost:3002/api-docs/catalog-service`);
  console.log(`   Order Service:    http://localhost:3003/api-docs/order-service`);
  console.log(`   Review Service:   http://localhost:3004/api-docs/review-service`);
  console.log(`   Blog Service:     http://localhost:3005/api-docs/blog-service`);
});

export default app;

