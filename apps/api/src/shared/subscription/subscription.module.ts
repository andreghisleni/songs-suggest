import { Module } from '@nestjs/common';

import { PubSubService } from './pubSub.service';

@Module({
  imports: [],
  providers: [
    PubSubService,
    {
      provide: 'PUB_SUB',
      useClass: PubSubService,
    },
  ],
  exports: [PubSubService],
})
export class SubscriptionModule {}
