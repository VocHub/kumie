import { Gogoanime as GogoAnimeProvider } from '@jet-black/provider';

import { Runner } from '../runner';
import { prisma } from '../../prisma';
export class Gogoanime extends Runner {
  provider = new GogoAnimeProvider();

  async gatherer(animeId: string) {
    const _info = await this.provider.getAnimeInfo(animeId);

    // await this.model.handle({
    //   title: info.title,
    //   synopsis: info.description,
    //   altTitles: info.otherNames,
    //   genres: info.genres
    // });
  }

  async indexer() {
    for (let page = 1; ; page++) {
      console.time(`Gogoanime indexing page - ${page}`);

      const results = await this.provider.getPage(page);

      for (const anime of results.resources) {
        await this.gatherer(anime.id);
      }
      console.timeEnd(`Gogoanime indexing page - ${page}`);
      if (!results.hasNextPage) break;
    }
    console.log('Gogoanime indexer finished');
  }

  async watcher(interval: number): Promise<void> {
    // TODO
  }
}
