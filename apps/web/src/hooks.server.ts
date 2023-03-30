import type { Handle } from '@sveltejs/kit';
import { type Theme, themes } from '@jet-black/types';

const validateTheme = (theme: unknown): theme is Theme =>
  themes.includes(theme as Theme);

export const handle: Handle = async ({ event, resolve }) => {
  const theme = event.cookies.get('theme');
  if (validateTheme(theme)) {
    event.locals.theme = theme;
  } else event.locals.theme = null;

  return resolve(event, {
    transformPageChunk: ({ html }) =>
      html.replaceAll('$theme$', event.locals.theme || '')
  });
};
