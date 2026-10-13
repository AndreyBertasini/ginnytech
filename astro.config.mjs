import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ginnytech.it',
  output: 'static',
  outDir: './.open-next/assets',
  build: {
    assets: '_astro'
  },
  integrations: [sitemap()],
  vite: {
    // Scan active Astro routes, not the retained Payload/Next.js template.
    optimizeDeps: { entries: ['src/pages/**/*.astro', '!**/src/app/**'] },
  },
});
