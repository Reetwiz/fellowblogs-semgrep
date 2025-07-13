import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';

import { logger, requestLogger } from './config/logger';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';
import appRouter from './routes';

dotenv.config();

const app: Application = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://localhost:80',
    'http://192.168.226.128:80', 
    'http://192.168.226.128:8080', 
    // 'https://your-production-domain.com'
  ],
  credentials: true, // Uncomment if you use cookies/auth
};

app.use(express.json());
app.use(cors(corsOptions));
//app.use(cors({ origin: true, credentials: true }));
app.use(requestLogger);

// Health check endpoint for blogs
app.get('/api/blogs/health', (req: Request, res: Response) => {
  res.status(200).send(`OK from ${PORT}`);
});

// Main application routes
app.use(appRouter);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
