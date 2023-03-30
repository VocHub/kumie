import { gogoanime } from '$lib/models';
import type { PageServerLoad } from './$types';

export const load = (async ({ setHeaders }) => {
  const { ttl, resources } = await gogoanime.trending();

  setHeaders({
    'cache-control': `max-age=${ttl}`
  });

  return { resources };
}) satisfies PageServerLoad;
