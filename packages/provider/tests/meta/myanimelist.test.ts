import { MyAnimeList } from '../../src/provider';
import { describe, it, expect } from 'vitest';
import { config } from 'dotenv';
config();

// TODO: remember to set this env in the workflow file
describe('MyAnimeList', () => {
  const mal = new MyAnimeList(process.env.X_MAL_CLIENT_ID);

  describe('Paging', async () => {
    const result = await mal.scrapePage(1);

    it('Has content', () => {
      expect(result?.results.length).toBeGreaterThan(0);
    });
    it('Has hasNextPage', () => {
      expect(result?.hasNextPage).toBeTruthy();
    });

    it('Throws on page out of bounds', async () => {
      expect(mal.scrapePage(25000)).rejects.toThrowError();
    });
  });

  // TODO write tests for the api
  describe('Api', async () => {
    const result = await mal.apiAnimeInfo('11755');
    it('Has content', () => {
      expect(result.synopsis).toBeTruthy();
    });
  });
});
