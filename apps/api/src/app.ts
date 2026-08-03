import cors from 'cors';
import express from 'express';
import { toNodeHandler } from 'better-auth/node';

import { HTTPStatusCodes } from './constants/http-status-codes';
import { requestLogger } from './lib/logger';
import { errorHandler, notFoundHandler } from './middleware/error-handler';
import { sendSuccess } from './lib/api-response';
import { auth } from './auth/auth';
import { env } from './env';

export const app = express();

app.use(
  cors({
    origin: env.WEB_URL,
    credentials: true,
  }),
);
app.use(requestLogger);
// need to come first.
app.all('/api/auth/*splat', toNodeHandler(auth));
// then the rest of the middleware and routes.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/health', (_request, response) => {
  sendSuccess(response, HTTPStatusCodes.OK, 'API is healthy.', { status: 'ok' });
});

app.use(notFoundHandler);
app.use(errorHandler);
