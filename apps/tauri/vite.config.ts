import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { join } from 'node:path';

export default defineConfig({
  plugins: [svelte()],

  resolve: {
    alias: {
      $lib: join(__dirname, 'src/lib'),
      $routes: join(__dirname, 'src/routes')
    }
  },

  publicDir: './static',

  clearScreen: false,

  server: {
    strictPort: true,
    port: 3000
  },

  envPrefix: ['VITE_', 'TAURI_'],

  build: {
    emptyOutDir: true,
    target: ['es2021', 'chrome100', 'safari13'],
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
    outDir: 'build'
  }
});
