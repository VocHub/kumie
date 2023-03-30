import type { ResourceContent } from '@jet-black/types';

import { Provider } from '../provider';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

export class Gogoanime extends Provider {
  protected BASE_URLS = [
    new URL('https://www1.gogoanime.bid/'),
    new URL('https://ajax.gogo-load.com/ajax/')
  ];
  protected PROVIDER_NAME = 'Gogoanime';
  protected headers = [{}];

  async scrapeLatest() {
    const { $ } = await this.urlToCheery();

    const resources = $('div.last_episodes > ul.items > li')
      .map((_, e) => {
        const tag = $(e).find('p > a');

        // TODO: Regex this
        const resource = {
          id: tag.attr('href')?.replace('/', '').split('-episode')[0],
          title: tag.attr('title')
        };

        return resource;
      })
      .get();

    return {
      resources,
      hasNextPage: false
    };
  }
  async scrapePage(page = 1) {
    if (page < 1) throw new Error(`Gogoanime: 'page' cannot be less than 1.`);

    const { $ } = await this.urlToCheery('anime-list.html', {
      queryParams: { page }
    });

    const resources = $('div.anime_list_body > ul.listing > li')
      .map((_, e) => {
        const tag = $(e).find('a');
        const resource = {
          title: tag.text(),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id: tag.attr('href')!.replace('/category/', '')
        };

        return resource;
      })

      .get();

    const hasNextPage = resources.length === 136;

    return {
      resources,
      hasNextPage
    };
  }
  async scrapeSearch(query: string, page = 1) {
    if (page < 1) throw new Error(`Gogoanime: 'page' cannot be less than 1.`);
    if (!query) throw new Error(`Gogoanime: 'query' cannot be empty.`);

    const { $ } = await this.urlToCheery('search.html', {
      queryParams: {
        keyword: query,
        page
      }
    });

    const pages = +$('div.anime_name_pagination > div > ul > li').last().text();
    if (pages < page)
      throw new Error(
        `Gogoanime: 'search' page out of range - query: ${query}, page ${page}`
      );
    const hasNextPage = pages !== page;

    const resources = $('div.last_episodes > ul > li')
      .map((_, e) => {
        // TODO: Regex thi
        const tag = $(e).find('p.name > a');
        const resource = {
          title: tag.attr('title'),
          id: tag.attr('href')?.replace('/category/', '')
        };

        return resource;
      })
      .get();

    return {
      resources,
      hasNextPage
    };
  }
  async scrapeAnimeInfo(animeId: string) {
    const { $ } = await this.urlToCheery(`category/${animeId}`);

    const ep_start = $('#episode_page > li')
      .first()
      .find('a')
      .attr('ep_start')!;
    const ep_end = $('#episode_page > li')
      .last()
      .find('a')
      .text()
      .trim()
      .replace(/^\d+-/, '');
    const movie_id = $('#movie_id').attr('value')!;
    const alias = $('#alias_anime').attr('value')!;

    const { $: $$ } = await this.urlToCheery('load-list-episode', {
      queryParams: {
        ep_start,
        ep_end,
        id: movie_id,
        default_ep: 0,
        alias
      }
    });

    const animeInfo = {
      id: animeId,
      title: $('div.anime_info_body_bg > h1').text(),
      description: $('div.anime_info_body_bg > p:eq(2)')
        .contents()
        .filter(node => node === 1)
        .text(),
      image: $('div.anime_info_body_bg > img').attr('src')!,
      releaseDate: $('div.anime_info_body_bg > p:eq(4)')
        .contents()
        .filter(node => node === 1)
        .text(),
      genres: $('div.anime_info_body_bg > p:eq(3) > a')
        .map((_, e) => $(e).attr('title'))
        .get(),
      otherNames: $('div.anime_info_body_bg > p:eq(6)')
        .contents()
        .filter(node => node === 1)
        .text()
        .split(',')
        .map(name => name.trim())
        .filter(Boolean),
      status: $('div.anime_info_body_bg > p:eq(5) > a').text(),
      type: $('div.anime_info_body_bg > p:eq(1) > a').attr('title'),
      episodes: $$('#episode_related > li')
        .map((_, el) => {
          // TODO: Regex this
          return {
            id: $(el).find('a').attr('href')!.split('/')[1],

            number: +parseFloat(
              $(el).find(`div.name`).text().replace(/EP\s/, '')
            )
          } satisfies ResourceContent;
        })
        .get()
    };

    return animeInfo;
  }
  async scrapeEpisodeServers(id: string) {
    const { $ } = await this.urlToCheery(id);

    const result = $('div.anime_video_body > div.anime_muti_link > ul > li')
      .map((_, e) => {
        const tag = $(e).find('a');
        const url = tag.attr('data-video');

        return {
          name: tag.text().replace('Choose this server', '').trim(),
          url
        };
      })
      .get();

    return result;
  }
}
