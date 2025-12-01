import express, { type Request, type Response, type NextFunction } from 'express'
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
// import { initializeSocketServer } from "./websocket/socketServer";

dotenv.config();

const router = express();
const server = createServer(router);
const PORT = process.env.PORT || 3000;

router.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    credentials: true,
  })
);
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ extended: true, limit: '50mb' }));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Aevoria API",
      version: "1.0.0",
      description: "Aevoria API Documentation",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Local Development (Default)",
        variables: {}
      },
    //   {
    //     url: "https://mathis.alwaysdata.net",
    //     description: "Alwaysdata Production",
    //   },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/**/*.ts", "./src/models/*.ts"],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);
const swaggerUiHandler = swaggerUi.setup(swaggerSpecs, {
  explorer: true,
  customSiteTitle: "Aevoria API Documentation",
  swaggerOptions: {
    url: `http://localhost:${PORT}`,
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    displayRequestDuration: true,
    docExpansion: "list",
    filter: true,
    showRequestHeaders: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
    persistAuthorization: true,
    defaultModelRendering: "model",
    supportedSubmitMethods: ["get", "post", "put", "delete", "patch"],
    operationsSorter: "alpha",
    tagsSorter: "alpha"
  }
});
router.use("/api-docs", swaggerUi.serve, swaggerUiHandler);

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

router.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Not Found",
        path: req.path 
    })
})

router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Internal Server Error",
        message: err.message || 'An unexpected error occurred'
    });
});

// initializeSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});

export default router

