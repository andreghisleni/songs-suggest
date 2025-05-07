import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PubSubAsyncIterableIterator } from 'graphql-subscriptions/dist/pubsub-async-iterable-iterator';

@Injectable()
export class PubSubService {
  private pubSub: PubSub = new PubSub();

  publish(triggerName: string, payload: any): Promise<void> {
    return this.pubSub.publish(triggerName, payload);
  }
  subscribe(triggerName: string, onMessage: (...args: any[]) => void): Promise<number> {
    return this.pubSub.subscribe(triggerName, onMessage);
  }
  unsubscribe(subId: number): void {
    return this.pubSub.unsubscribe(subId);
  }

  asyncIterableIterator<T>(triggers: string | readonly string[]): PubSubAsyncIterableIterator<T> {
    return this.pubSub.asyncIterableIterator<T>(triggers);
  }
}
