import { describe, it, expect } from 'vitest';
import { ReadLightNovel } from '../../src/provider';
import { ID } from '@jet-black/types';

describe('ReadLightNovel', () => {
  const readLightNovel = new ReadLightNovel();

  describe('Latest', async () => {
    const result = await readLightNovel.scrapeLatest();

    it('Has content', () => {
      expect(result.length).toBeGreaterThan(0);
    });
  }, 10_000);

  describe('Index', async () => {
    const result = await readLightNovel.scrapePage(1);

    it('Has content', () => {
      expect(result.resources.length).toBeGreaterThan(0);
    });

    it('It has next page', () => {
      expect(result.hasNextPage).toBeTruthy();
    });

    it('Should not have next page', async () => {
      const result = await readLightNovel.scrapePage(27);
      expect(result.hasNextPage).toBeFalsy();
    });
  }, 10_000);

  describe('Fiction Info', async () => {
    const result = await readLightNovel.scrapeFictionInfo(
      'mother-of-learning-120522' as ID
    );

    it('Has content ', () => {
      expect(result.chapters.length).toBeGreaterThan(0);
    });
  }, 10_000);

  describe('Chapter content', async () => {
    const result = await readLightNovel.scrapeChapterInfo(
      'my-wife-is-the-asura-empress' as ID,
      'chapter-13' as ID
    );
    it('Has content', () => {
      expect(result.content.length).toBeGreaterThan(0);
    });
  }, 10_000);

  describe.skip('Search', () => {
    // let result: Awaited<ReturnType<typeof readlightnovel.search>>;
    // it('Resolves', async () => {
    // result = await readlightnovel.search('mother of learning');
    // });
  });
});
