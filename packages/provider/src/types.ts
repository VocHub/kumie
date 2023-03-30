/* eslint-disable no-unused-vars */

export type Resource = {
  title: string;
  id: string;
};

export type Result = {
  hasNextPage: boolean;
  resources: Resource[];
};

export type Fetcher = <T extends 'text' | 'json'>(
  url: URL,
  options: {
    body?: BodyInit;
    headers?: HeadersInit;
    method?: 'GET' | 'POST';
  },
  format: T
) => Promise<T extends 'text' ? string : unknown>;

export type Options = {
  encodeParams?: boolean;
  queryParams?: Record<string, string | number>;
  urlIndex?: number;
  method?: 'GET' | 'POST';
  body?: BodyInit;
  useHeaders?: number[];
};
