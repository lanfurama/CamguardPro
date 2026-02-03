import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { apiMiddleware } from './api-src/dev-server';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3003,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'api-middleware',
          enforce: 'pre',
          configureServer(server) {
            server.middlewares.use(apiMiddleware);
          },
        },
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.USE_VERTEX_AI': JSON.stringify(env.USE_VERTEX_AI),
        'process.env.GOOGLE_CLOUD_PROJECT': JSON.stringify(env.GOOGLE_CLOUD_PROJECT),
        'process.env.GOOGLE_CLOUD_LOCATION': JSON.stringify(env.GOOGLE_CLOUD_LOCATION),
        'process.env.VERTEX_AI_SERVICE_ACCOUNT_PATH': JSON.stringify(env.VERTEX_AI_SERVICE_ACCOUNT_PATH),
        'process.env.VERTEX_AI_ENDPOINT_ID': JSON.stringify(env.VERTEX_AI_ENDPOINT_ID),
        'process.env.VERTEX_AI_API_KEY': JSON.stringify(env.VERTEX_AI_API_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
