import cors from 'cors';
import express from 'express';
import { HTTPStatusCodes } from './constants/http-status-codes';
import { requestLogger } from './lib/logger';
import { errorHandler, notFoundHandler } from './middleware/error-handler';
import { sendSuccess } from './lib/api-response';

export const app = express();

app.use(requestLogger);
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/health', (_request, response) => {
  sendSuccess(response, HTTPStatusCodes.OK, 'API is healthy.', { status: 'ok' });
});

app.use(notFoundHandler);
app.use(errorHandler);
