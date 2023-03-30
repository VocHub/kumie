import '@jet-black/tailwind/styles';

import {
  withThemeByClassName,
  withThemeByDataAttribute
} from '@storybook/addon-styling';

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark'
    },
    defaultTheme: 'dark'
  }),

  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark'
    },
    defaultTheme: 'dark',
    attributeName: 'data-theme'
  })
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
