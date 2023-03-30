import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html']
    },
    cache: {
      dir: '.vitest-cache'
    },
    alias: {
      providers: './src/index.ts'
    }
  }
});
