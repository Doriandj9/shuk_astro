// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import path from 'path';
import node from '@astrojs/node';

// import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://shuk.ec',
  base: '/view/posts/*',
  trailingSlash: 'never',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react()],
  vite:{
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@web': path.resolve('./src/modules/web'),
        '@core': path.resolve('./src/modules/core'),
        '@admin': path.resolve('./src/modules/admin'),
      }
    }  
  }
});