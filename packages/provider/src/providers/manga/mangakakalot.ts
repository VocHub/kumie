import type { CheerioAPI } from 'cheerio';
import { Provider } from '../provider';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

export class Mangakakalot extends Provider {
  protected BASE_URLS = [
    new URL('https://manganato.com/'),
    new URL('https://chapmanganato.com/')
  ];
  protected PROVIDER_NAME = 'Mangakakalot';
  protected headers = [{}];

  async scrapeLatest(page = 1) {
    if (page < 1) throw new Error('Index page page cannot be less than 1');

    const { $ } = await this.urlToCheery(`genre-all/${page}`);
    const hasNextPage = this.hasNextPage($, page);

    const resources = $('div.panel-content-genres > div.content-genres-item')
      .map((_, e) => {
        const tag = $(e).find('a');

        return {
          id: tag.attr('href')!.split('.com/')[1],
          title: tag.attr('title')!.trim(),
          url: tag.attr('href')!
        };
      })
      .get();

    return {
      resources,
      hasNextPage
    };
  }
  async scrapePage(page: number) {
    if (page < 1)
      throw this.err(`Page cannot be less than 1 - received ${page}`);

    const { $ } = await this.urlToCheery(`advanced_search`, {
      queryParams: {
        s: 'all',
        page
      }
    });

    const hasNextPage = this.hasNextPage($, page);

    const resources = $('div.panel-content-genres > div.content-genres-item')
      .map((_, e) => {
        // TODO: Regex this

        const tag = $(e).find('div.genres-item-info > h3 > a');
        return {
          id: tag.attr('href')?.split('.com/')[1],
          title: tag.attr('title')?.trim()
        };
      })
      .get();
    return {
      resources,
      hasNextPage
    };
  }
  async scrapeSearch(query: string, page = 1) {
    if (page < 1)
      throw new Error(
        `Mangakakalot search page cannot be less than 1 - was ${page} query:${query}`
      );

    const { $ } = await this.urlToCheery(
      `search/story/${query.replace(' ', '_')}`,
      {
        queryParams: {
          page
        }
      }
    );

    const hasNextPage = this.hasNextPage($, page);

    const resources = $('div.panel-search-story > div.search-story-item > a')
      .map((_, e) => {
        const tag = $(e);

        return {
          id: tag.attr('href')!.split('.com/')[1],
          title: tag.attr('title')!.trim()
        };
      })
      .get();

    if (!resources.length) throw new Error('No search results found');

    return {
      resources,
      hasNextPage
    };
  }
  async scrapeMangaInfo(mangaId: string) {
    const { $ } = await this.urlToCheery(mangaId, { urlIndex: 1 });
    //TODO: Regex this

    const mangaInfo = {
      title: $('div.panel-story-info > div.story-info-right > h1').text(),
      altTitles: $(
        'div.story-info-right > table > tbody > tr:nth-child(1) > td.table-value > h2'
      )
        .text()
        .split(';'),
      description: $('#panel-story-info-description')
        .text()
        .replace(`Description :`, '')
        .replace(/\n/g, '')
        .trim(),
      image: $('div.story-info-left > span.info-image > img').attr('src'),
      genres: $(
        'div.story-info-right > table > tbody > tr:nth-child(4) > td.table-value > a'
      )
        .map((_, e) => $(e).text())
        .get(),
      status: $(
        'div.story-info-right > table > tbody > tr:nth-child(3) > td.table-value'
      )
        .text()
        .trim(),
      views: parseInt(
        $('div.story-info-right > div > p:nth-child(2) > span.stre-value')
          .text()
          .replace(/,/g, '')
          .trim()
      ),
      authors: $(
        'div.story-info-right > table > tbody > tr:nth-child(2) > td.table-value > a'
      )
        .map((_, e) => $(e).text())
        .get(),
      chapters: $(
        'div.container-main-left > div.panel-story-chapter-list > ul > li'
      )
        .map((_, e) => ({
          id:
            $(e).find('a').attr('href')!.split('.com/')[1]! + '$$READMANGANATO',
          title: $(e).find('a').text(),
          views: parseInt(
            $(e)
              .find('span.chapter-view.text-nowrap')
              .text()!
              .replace(/,/g, '')
              .trim()
          ),
          url: $(e).find('a').attr('href')!,
          releasedDate: $(e).find('span.chapter-time.text-nowrap').attr('title')
        }))
        .get()
    };
    return mangaInfo;
  }
  async scrapeChapterInfo(chapterId: string) {
    const { $ } = await this.urlToCheery(
      chapterId.replace('$$READMANGANATO', ''),
      {
        urlIndex: 1
      }
    );

    const pages = $('div.container-chapter-reader > img')
      .map((i, el) => ({
        img: $(el).attr('src')!,
        page: i,
        title: $(el)
          .attr('alt')!
          .replace(/(- Mangakakalot.com)|(- MangaNato.com)/g, ' ')
          .trim()!
      }))
      .get();

    return pages;
  }

  private hasNextPage($: CheerioAPI, currentPage: number): boolean {
    const lastPage = $(
      'div.panel-page-number > div.group-page > a.page-blue.page-last'
    )
      .text()
      .replace('LAST(', '')
      .replace(')', '');
    if (!lastPage.length) return false;
    return currentPage < +lastPage;
  }
}
