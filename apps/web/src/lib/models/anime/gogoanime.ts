import { env } from '$env/dynamic/private';
import { redisClient } from '$lib/redis/client';
import type { Resource, ResourceInfo, VideoSource } from '@jet-black/types';
import { filterDuplicates } from '../utils';
import { ANIME } from '@consumet/extensions';

const gogoanime = new ANIME.Gogoanime();
const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const latest = async () => {
  const resources: Resource[] = [];
  let ttl = MINUTE * 5;
  const cached = await redisClient.get('gogoanime:latest');

  if (!cached) {
    for (let i = 1; i < 10; i++) {
      const res = await fetch(
        `${env.CONSUMET_URL}/anime/gogoanime/recent-episodes?page=${i}`
      );

      const data = await res.json();
      resources.push(...data.results);
      if (!data.hasNextPage) break;
    }
    redisClient.set('gogoanime:latest', JSON.stringify(resources), { EX: ttl });
  } else {
    resources.push(...(JSON.parse(cached) as unknown as Resource[]));
    ttl = await redisClient.ttl('gogoanime:latest');
  }

  return {
    ttl,
    resources: filterDuplicates(resources)
  };
};

export const trending = async () => {
  const resources: Resource[] = [];
  let ttl = DAY;
  const cached = await redisClient.get('gogoanime:trending');
  if (!cached) {
    for (let i = 1; i < 10; i++) {
      const res = await fetch(
        `${env.CONSUMET_URL}/anime/gogoanime/top-airing?page=${i}`
      );

      const data = await res.json();
      resources.push(...data.results);
      if (!data.hasNextPage) break;
      redisClient.set('gogoanime:trending', JSON.stringify(resources), {
        EX: ttl
      });
    }
  } else {
    resources.push(...(JSON.parse(cached) as unknown as Resource[]));
    ttl = await redisClient.ttl('gogoanime:trending');
  }

  return {
    ttl,
    resources: filterDuplicates(resources)
  };
};

export const animeInfo = async (animeId: string) => {
  let info: ResourceInfo;
  let ttl = MINUTE * 5;

  const cached = await redisClient.get(`gogoanime:animeInfo:${animeId}`);
  if (!cached) {
    const res = await fetch(
      `${env.CONSUMET_URL}/anime/gogoanime/info/${animeId}`
    );

    info = await res.json();

    redisClient.set(`gogoanime:animeInfo:${animeId}`, JSON.stringify(info), {
      EX: ttl
    });
  } else {
    info = JSON.parse(cached) as ResourceInfo;
    ttl = await redisClient.ttl(`gogoanime:animeInfo:${animeId}`);
  }

  return {
    ttl,
    info
  };
};

export const search = async (query: string) => {
  const resources: Resource[] = [];
  let ttl = HOUR * 6;

  const cached = await redisClient.get(`gogoanime:search:${query}`);
  if (!cached) {
    for (let i = 1; i < 5; i++) {
      const res = await fetch(
        `${env.CONSUMET_URL}/anime/gogoanime/${query}?page=${i}`
      );
      const data = await res.json();
      resources.push(...data.results);
      if (!data.hasNextPage) break;
    }
    redisClient.set(`gogoanime:search:${query}`, JSON.stringify(resources), {
      EX: ttl
    });
  } else {
    resources.push(...JSON.parse(cached));
    ttl = await redisClient.ttl(`gogoanime:search:${query}`);
  }
  return {
    ttl,
    resources: filterDuplicates(resources)
  };
};

export const videoSources = async (episodeId: string) => {
  const sources: VideoSource[] = [];
  let ttl = DAY;

  const cached = await redisClient.get(`gogoanime:videoSources:${episodeId}`);
  if (!cached) {
    const data = await gogoanime.fetchEpisodeSources(episodeId);
    sources.push(...(data.sources as VideoSource[]));
    await redisClient.set(
      `gogoanime:videoSources:${episodeId}`,
      JSON.stringify(sources),
      { EX: ttl }
    );
  } else {
    sources.push(...JSON.parse(cached));
    ttl = await redisClient.ttl(`gogoanime:videoSources:${episodeId}`);
  }

  return { sources, ttl };
};
