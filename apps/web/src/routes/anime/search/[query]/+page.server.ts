import { gogoanime } from '$lib/models';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, setHeaders }) => {
  const { ttl, resources } = await gogoanime.search(params.query);
  setHeaders({
    'cache-control': `max-age=${ttl}`
  });

  return { resources, params };
}) satisfies PageServerLoad;
