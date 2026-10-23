import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'automatic' }),
    svgr({
      svgrOptions: {
        replaceAttrValues: {
          '#161616': 'currentColor',
          '#393939': 'currentColor',
        },
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    css: true,
  },
});
