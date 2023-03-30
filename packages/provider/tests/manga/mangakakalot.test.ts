import { Mangakakalot } from '../../src/provider';
import { describe, expect, it } from 'vitest';

describe('Mangakakalot', () => {
  const mangakakalot = new Mangakakalot();

  describe('Latest', async () => {
    const result = await mangakakalot.scrapeLatest();

    it('Has resources', () => {
      expect(result.resources.length).toBeGreaterThan(0);
    });

    it('Has next page', () => {
      expect(result.hasNextPage).toBeTruthy();
    });
  });

  describe('Paging', async () => {
    const result = await mangakakalot.scrapePage(1);

    it('HasNextPage', () => {
      expect(result.hasNextPage).toBeTruthy();
    });

    it('Has resources', () => {
      expect(result.resources.length).toBeGreaterThan(0);
    });
  });

  describe('Search', () => {
    describe('Search 1', async () => {
      const result = await mangakakalot.scrapeSearch('shadow', 1);

      it('Has content', () => {
        expect(result.resources.length).toBeGreaterThan(0);
      });

      it('hasNextPage is true', () => {
        expect(result.hasNextPage).toBeTruthy();
      });

      it('Chain next page', async () => {
        for (let page = 1; ; page++) {
          expect(page).toBeLessThanOrEqual(4);
          const result = await mangakakalot.scrapeSearch('shadow', page);
          expect(result.resources.length).toBeGreaterThan(0);
          if (!result.hasNextPage) break;
        }
      });
    });
    describe('Search 2', async () => {
      const result = await mangakakalot.scrapeSearch('solo leveling', 1);

      it('Has content', () => {
        expect(result.resources.length).toBeGreaterThan(0);
      });

      it('hasNextPage is false', () => {
        expect(result.hasNextPage).toBeFalsy();
      });
    });

    it('Should throw on negative pages ', async () => {
      await expect(
        mangakakalot.scrapeSearch('sample', -1)
      ).rejects.toThrowError();
    });
    it('Should throw on 0th page ', async () => {
      await expect(
        mangakakalot.scrapeSearch('sample', 0)
      ).rejects.toThrowError();
    });
  });

  describe('MangaInfo', async () => {
    const result = await mangakakalot.scrapeSearch('one p', 1);

    it('Have content', () => {
      expect(result.resources.length).toBeGreaterThan(0);
    });

    await it.each(result.resources)(
      '',
      async manga => {
        const result = await mangakakalot.scrapeMangaInfo(manga.id);
        expect(result.chapters.length).toBeGreaterThan(0);
      },
      { timeout: 10_000 }
    );
  });

  describe('ChapterInfo', async () => {
    const latest = await mangakakalot.scrapeLatest();
    const mangaInfo = await mangakakalot.scrapeMangaInfo(
      latest.resources[0].id
    );
    const chapterInfo = await mangakakalot.scrapeChapterInfo(
      mangaInfo.chapters[0].id
    );

    it('Chapter has content images', async () => {
      expect(chapterInfo.length).toBeGreaterThan(0);
    });
  });
});
