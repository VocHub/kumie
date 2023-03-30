import type { PageLoad } from './$types';

export const load = (async () => {
  const res = await fetch(
    'https://raw.githubusercontent.com/Azure-Blade/Jet-Black/release/apps/web/CHANGELOG.md'
  );
  return {
    changelog: res.text()
  };
}) satisfies PageLoad;
