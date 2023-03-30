import type { Resource } from '@jet-black/types';

export const filterDuplicates = (resources: Resource[]) =>
  resources.reduce((prev, cur) => {
    if (!prev.filter(p => p.id === cur.id).length) prev.push(cur);
    return prev;
  }, [] as Resource[]);
