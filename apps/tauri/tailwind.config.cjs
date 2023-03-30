const config = require('@jet-black/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: [
    `src/**/*.{svelte,ts}`,
    `../../packages/ui/components/**/*.{svelte,ts}`
  ]
};
