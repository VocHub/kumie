import { gogoanime } from '$lib/models';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params }) => {
  const resourceInfo = await gogoanime.animeInfo(params.animeId);

  return {
    resourceInfo
  };
}) satisfies LayoutServerLoad;
