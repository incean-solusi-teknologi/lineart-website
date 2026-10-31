import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { nitro } from 'nitro/vite';
import tailwindcss from '@tailwindcss/vite';
import { prerenderPaths } from './src/data/paths.ts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    server: { host: '127.0.0.1', port: 3000 },
    preview: { host: '127.0.0.1' },
    define: {
      'import.meta.env.VITE_DEPLOYMENT_ENV': JSON.stringify(
        process.env.VERCEL_ENV ??
          process.env.VITE_DEPLOYMENT_ENV ??
          env.VITE_DEPLOYMENT_ENV ??
          'development',
      ),
    },
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    plugins: [
      tailwindcss(),
      tanstackStart({
        prerender: {
          enabled: true,
          autoStaticPathsDiscovery: false,
          crawlLinks: false,
          failOnError: true,
          concurrency: 4,
        },
        pages: prerenderPaths.map((path) => ({ path, prerender: { enabled: true } })),
        sitemap: { enabled: false },
      }),
      nitro({ compatibilityDate: '2026-10-31', preset: process.env.VERCEL ? 'vercel' : 'bun' }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
  };
});
