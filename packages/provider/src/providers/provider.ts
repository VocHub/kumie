import { load } from 'cheerio';
import type { Fetcher, Options } from '../types';

export abstract class Provider {
  protected abstract readonly BASE_URLS: URL[];
  protected abstract readonly PROVIDER_NAME: string;
  protected abstract readonly headers: HeadersInit[];
  private fetcher: Fetcher;

  constructor(fetcher?: Fetcher) {
    this.fetcher = fetcher ?? this.defaultFetcher;
  }

  private defaultFetcher: Fetcher = async (url, opts, format) => {
    const res = await fetch(url, {
      ...opts
    });

    if (format === 'json') return await res.json();
    else if (format === 'text') return await res.text();
  };

  private urlConstructor(path: string, opts?: Options): URL {
    const url = this.BASE_URLS[opts?.urlIndex ?? 0];
    url.pathname = path;

    if (opts?.queryParams) {
      if (!opts.encodeParams) {
        url.search = Object.entries(opts.queryParams)
          .map(([key, val]) => `${key}=${val}`)
          .toString();
      } else {
        url.search = new URLSearchParams(
          Object.entries(opts.queryParams).map(([key, val]) => [
            key,
            val.toString()
          ])
        ).toString();
      }
    }

    return url;
  }

  private headersConstructor(opts?: Options): HeadersInit {
    const headers: HeadersInit = {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/110.0'
    };

    this.headers.map((header, i) => {
      if (opts?.useHeaders?.includes(i)) Object.assign(headers, header);
    });
    return headers;
  }

  protected async urlToCheery(path = '', opts?: Options) {
    const url = this.urlConstructor(path, opts);
    const headers = this.headersConstructor(opts);

    const html = await this.fetcher(
      url,
      {
        headers,
        ...opts
      },
      'text'
    );
    const $ = load(html);
    return { $, url };
  }

  protected async urlToJson(path = '', opts?: Options) {
    const url = this.urlConstructor(path, opts);
    const headers = this.headersConstructor(opts);
    const json = await this.fetcher(
      url,
      {
        headers,
        ...opts
      },
      'json'
    );
    return { json, url };
  }

  protected err(msg: string): Error {
    return new Error(`${this.PROVIDER_NAME} => ${msg}`);
  }
  protected consoleErr(msg: string, ...args: unknown[]) {
    console.error(`${this.PROVIDER_NAME} - ${msg} - ${args}`);
  }
}
