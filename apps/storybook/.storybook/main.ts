import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx|svelte)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-styling'
  ],
  framework: {
    name: '@storybook/svelte-vite',
    options: {}
  },

  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../static']
};
export default config;
