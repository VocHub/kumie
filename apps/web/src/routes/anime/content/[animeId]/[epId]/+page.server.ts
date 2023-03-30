import { gogoanime } from '$lib/models';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, setHeaders }) => {
  const { ttl, sources } = await gogoanime.videoSources(params.epId);

  setHeaders({
    'cache-control': `max-age=${ttl}`
  });

  return {
    sources,
    epId: params.epId
  };
}) satisfies PageServerLoad;
