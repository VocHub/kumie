import { Provider } from '../provider';

/* eslint-disable @typescript-eslint/no-non-null-assertion */

export class ReadLightNovel extends Provider {
  protected BASE_URLS = [new URL('https://www.readlightnovel.me/')];
  protected PROVIDER_NAME = 'ReadLightNovel';
  protected headers = [{}];

  async scrapeLatest(page = 1) {
    if (page < 1)
      throw this.err(`Page cannot be less than 1 - received ${page}`);
    if (page > 50)
      throw this.err(`Page cannot be less than 1 - received ${page}`);

    const { $ } = await this.urlToCheery(`latest-updates-230822/${page}`);

    const resources = $('div.list-by-word-body > ul > li')
      .map((_, e) => {
        const tag = $(e).find('a');

        return tag
          .attr('href')!
          .replace(/https:\/\/www.readlightnovel.me\/|\/chapter-\d+.+/g, '');
      })
      .get()
      .reduce(
        (ids, id) => (ids.includes(id) ? ids : [...ids, id]),
        [] as string[]
      );

    return resources;
  }
  async scrapePage(page = 1) {
    if (page < 1)
      throw this.err(`Page cannot be less than 1 - received ${page}`);

    const searchablePages = [
      '#',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];

    if (page > searchablePages.length)
      throw new Error(`ReadLightNovel: 'page' out of range`);

    const { $ } = await this.urlToCheery(
      `novel-list-rln/${searchablePages[page]}`
    );
    const hasNextPage = page < searchablePages.length;

    const resources = $('div.list-by-word-body > ul > li')
      .map((_, e) => {
        const tag = $(e).find('a');

        return {
          id: tag.attr('href')?.replace('https://www.readlightnovel.me/', ''),
          title: tag.text()
        };
      })
      .get();

    return {
      resources,
      hasNextPage
    };
  }

  async scrapeFictionInfo(id: string) {
    const { $, url } = await this.urlToCheery(id);

    const result = {
      title: $('div.block-title > h1').text(),
      description: $('div.novel-detail-body > p').text(),
      type: $(
        'div.novel-details > div.novel-detail-item:eq(0) > div.novel-detail-body > ul > li'
      )
        .find('a')
        .text(),
      genres: $(
        'div.novel-details > div.novel-detail-item:eq(1) > div.novel-detail-body > ul > li'
      )
        .map((_, e) => $(e).text())
        .get(),
      status: $(
        'div.novel-details > div.novel-detail-item:eq(7) > div.novel-detail-body > ul > li'
      ).text(),
      cover: $('div.novel-cover > a > img').attr('src'),
      chapters: $('ul.chapter-chs > li')
        .map((_, e) => {
          const tag = $(e).find('a');
          const result = {
            id: id + tag.attr('href')?.replace(url.href, ''),
            title: tag.text()
          };
          return result;
        })
        .get()
    };

    return result;
  }

  async scrapeChapterInfo(novelId: string, chapterId: string) {
    const { $ } = await this.urlToCheery(`${novelId}/${chapterId}`);

    const tag = $('div.chapter-content3 > div.desc');

    const chapterTitle = tag
      .contents()
      .filter(node => node === 12)
      .text()
      .trim()
      .replace(/Chapter\s\d+:\s/, '');
    const content = tag
      .find('p')
      .map((_, e) => $(e).text())
      .get();

    return {
      content,
      chapterTitle
    };
  }
  async scrapeSearch(_query: string) {
    // TODO: Idk how to do this.
    throw this.err('"Search" method not implemented');
  }
}
