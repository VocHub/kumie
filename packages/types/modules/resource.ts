// Helper for generating opaque types - ids.
declare const idSymbol: unique symbol;
export type ID = string & number & { [idSymbol]: never };

export interface Resource {
  title: string;
  image: string;
  id: ID;
}

export interface ResourceContent {
  id: ID;
  number: number;
}

export interface ResourceInfo {
  id: ID;
  title: string;
  url: string;
  genres: string[];
  totalEpisodes: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
  episodes: ResourceContent[];
}

export interface SearchResult {
  currentPage: number;
  hasNextPage: boolean;
  results: Resource[];
}

export interface VideoServers {
  name: string;
  url: string;
}
export interface VideoSource {
  url: string;
  isM3U8: boolean;
  quality: string;
}
