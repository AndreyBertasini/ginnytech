import { preview } from 'astro';
import { fileURLToPath } from 'node:url';

// Playwright owns this process. The API avoids Astro CLI's agent-mode daemon
// and its persistent PID file, so repeated runs can shut down cleanly.
const server = await preview({
  root: fileURLToPath(new URL('../', import.meta.url)),
  server: { host: '127.0.0.1', port: 4322 },
});

let stopping = false;
const stop = async () => {
  if (stopping) return;
  stopping = true;
  await server.stop();
};
process.once('SIGTERM', stop);
process.once('SIGINT', stop);
