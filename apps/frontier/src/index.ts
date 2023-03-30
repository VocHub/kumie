import { Gogoanime } from './runners/anime/gogoanime';
import { Runner } from './runners/runner';
import { ANIME, META } from 'consumet';

// const SECOND = 1000;
// const interval = 300 * SECOND;
// (async () => {
//   const runners: Runner[] = [new Gogoanime()];

//   const indexing = runners.map(runner => runner.indexer());
//   const watching = runners.map(runner => runner.watcher(interval));

//   await Promise.all([...indexing, ...watching]);
// })();

(async () => {
  const gogo = new ANIME.Gogoanime();
  const anilist = new META.Anilist();
  const mal = new META.Myanimelist();

  const latest = await gogo.fetchRecentEpisodes();

  const s = await anilist.advancedSearch(latest.results[0].title as string);
})();
