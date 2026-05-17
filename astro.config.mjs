import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ginnytech.it',
  output: 'static',
  build: {
    assets: '_astro'
  }
});
