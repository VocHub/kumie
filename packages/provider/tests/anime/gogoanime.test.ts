import { describe, expect, it } from 'vitest';
import { Gogoanime } from '../../src/provider';
import type { ID } from '@jet-black/types';

describe('Gogoanime', () => {
  const gogoanime = new Gogoanime();

  describe('Latest', async () => {
    const result = await gogoanime.scrapeLatest();

    it('Has content', () => {
      expect(result.resources.length).toBeGreaterThan(0);
    });
  });

  describe('Index', async () => {
    const result = await gogoanime.scrapePage(2);

    it('Has content', () => {
      expect(result.resources.length).toBeGreaterThan(0);
    });
    it('It has next page', () => {
      expect(result.hasNextPage).toBeTruthy();
    });
  });

  describe('Search', async () => {
    let result: Awaited<ReturnType<typeof gogoanime.scrapeSearch>>;

    it('Resolves', async () => {
      result = await gogoanime.scrapeSearch('one p', 1);
    }, 1000);

    it('Has content', () => {
      expect(result.resources.length).toBeGreaterThan(0);
    });

    it('It has next page', () => {
      expect(result.hasNextPage).toBeTruthy();
    });

    it('hasNextPage is false when query is at last page', async () => {
      const result = await gogoanime.scrapeSearch('one p', 7);
      expect(result.hasNextPage).toBeFalsy();
    });
    it('Throws on page out of range', async () => {
      await expect(gogoanime.scrapeSearch('one p', 9)).rejects.toThrowError();
    });

    it('Throws on query with 0 results', async () => {
      await expect(
        gogoanime.scrapeSearch("this anime doesn't exist for sure")
      ).rejects.toThrowError();
    });
  });

  describe('Anime info', async () => {
    const result = await gogoanime.scrapeAnimeInfo('one-piece' as ID);

    it('Has content', () => {
      expect(result.episodes.length).toBeGreaterThan(0);
    });
  });

  describe('Episode servers', async () => {
    const result = await gogoanime.scrapeEpisodeServers(
      'one-piece-episode-1051' as ID
    );

    it('More than 0 servers found', () => {
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
