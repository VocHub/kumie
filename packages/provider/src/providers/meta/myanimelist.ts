import type { MyAnimeListResponse } from '@jet-black/types';

import { Provider } from '../provider';

export class MyAnimeList extends Provider {
  protected BASE_URLS = [
    new URL('https://myanimelist.net/'),
    new URL('https://api.myanimelist.net/')
  ];
  protected PROVIDER_NAME = 'MyAnimeList';
  protected headers = [
    {
      X_MAL_CLIENT_ID: 'SET ME UP'
    }
  ];
  constructor(
    api_key?: string,
    ...args: ConstructorParameters<typeof Provider>
  ) {
    super(...args);
    this.headers[0]['X_MAL_CLIENT_ID'] = api_key ?? '';
  }
  async scrapePage(page = 1) {
    if (page < 1)
      throw this.err(`Page cannot be less than 1, received ${page}`);
    const { $, url } = await this.urlToCheery('anime.php', {
      queryParams: { show: page * 50 }
    });

    const trs = $(
      'div.js-categories-seasonal.js-block-list.list > table > tbody > tr'
    );
    const hasNextPage = !!trs.length;
    if (!trs.length) throw this.err(`Page has no content: page - ${page}`);

    const results = trs
      .map((i, e) => {
        if (i === 0) return;
        const tag = $(e).find('td > div > a');
        return {
          title: tag.find('strong').text(),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          malId: tag.attr('href')!.replace(/(.+\/anime\/)|(\/.+)/g, '')
        };
      })
      .get();

    return { results, hasNextPage, $, url };
  }

  async apiAnimeInfo(id: string) {
    if (!this.headers[0]['X_MAL_CLIENT_ID'])
      throw this.err('API key is not set');
    const { json } = await this.urlToJson(`v2/anime/${id}`, {
      queryParams: {
        fields:
          'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics'
      },
      encodeParams: false,
      urlIndex: 1,
      useHeaders: [0]
    });

    return json as MyAnimeListResponse;
  }
}
