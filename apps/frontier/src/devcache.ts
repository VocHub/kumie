import type { Fetcher } from '@jet-black/provider';

import { createClient } from 'redis';
import hash from 'object-hash';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

const redis = createClient({
  url: 'redis://localhost:6379'
});

await redis.connect();

export const devFetcher: Fetcher = async (url, opts, format) => {
  const requestHash = hash(opts);
  const redisKey = `${url.toString()}:${requestHash}:${format}`;
  let content = await redis.get(redisKey);
  if (!content) {
    const res = await fetch(url, {
      ...opts
    });
    if (format === 'json') content = await res.json();
    else if (format === 'text') content = await res.text();

    await redis.set(redisKey, content!, { EX: 60 * 60 * 2 }); // 2 hours
    return content;
  } else {
    if (format === 'json') return JSON.parse(content);
    else if (format === 'text') return content;
  }
};
