import nunjucks from './src/setup/nunjucks';
import app from './src/setup/app';
import { port, host } from './config';

if (!port) process.exit(1);

// Nunjucks
nunjucks.configure('./src/views', {
  autoescape: true,
  express: app,
});

// App
app.listen(port, host, () => {
  console.info(`⚡️[server]: Server is running at https://${host}:${port}`);
});
