import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ route }) => {
  if (route.id === '/anime') throw redirect(302, '/anime/latest');
  return {};
}) satisfies LayoutLoad;
