import { SubscriptionModule } from '@/shared/subscription/subscription.module';
import { Module } from '@nestjs/common';

import { EventsResolver } from './events.resolver';
import { EventsService } from './events.service';

@Module({
  providers: [EventsResolver, EventsService],
  imports: [SubscriptionModule],
  exports: [EventsService],
})
export class EventsModule {}
