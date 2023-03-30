const config = require('@jet-black/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: [
    `../../packages/ui/components/**/*.{svelte,ts}`,
    `../../packages/tailwind/**/*.{postcss}`,
    `stories/**/*.{svelte,ts}`
  ]
};
