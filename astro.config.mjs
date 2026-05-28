import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ginnytech.it',
  output: 'static',
  build: {
    assets: '_astro'
  },
  integrations: [sitemap()],
});