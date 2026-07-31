import { app } from './app';
import { env } from './env';
import { logger } from './lib/logger';

app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, `API server listening on http://localhost:${env.PORT}`);
});
