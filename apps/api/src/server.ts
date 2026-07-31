import { app } from './app';
import { env } from './env';

app.listen(env.PORT, () => {
  console.info(`API server listening on http://localhost:${env.PORT}`);
});
