/* eslint-disable no-unused-vars */

export abstract class Runner {
  abstract gatherer(resourceId: string): Promise<void>;
  abstract indexer(): Promise<void>;
  abstract watcher(_interval: number): Promise<void>;
}
