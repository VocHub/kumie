import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/provider.ts'],
  dts: true,
  splitting: false,
  sourcemap: true,
  outDir: 'dist',
  clean: true,
  minify: true,
  target: ['es2022'],
  format: ['esm', 'cjs', 'iife']
});
