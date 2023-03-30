import { expect, it, describe } from 'vitest';
import { Anilist } from '../../src/provider';

describe('Anilist', () => {
  const anilist = new Anilist();

  describe('Paging', async () => {
    const result = await anilist.apiPage();

    it.todo('Has Results', () => {
      //
    });
  });
});
