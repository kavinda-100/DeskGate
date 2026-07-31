import cors from 'cors';
import express from 'express';
import { errorHandler, notFoundHandler } from './middleware/error-handler';
import { sendSuccess } from './lib/api-response';

export const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (_request, response) => {
  sendSuccess(response, 200, 'API is healthy.', { status: 'ok' });
});

app.use(notFoundHandler);
app.use(errorHandler);
