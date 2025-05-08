import { SubscriptionModule } from '@/shared/subscription/subscription.module';
import { Module } from '@nestjs/common';

import { SongsResolver } from './songs.resolver';
import { SongsService } from './songs.service';

@Module({
  providers: [SongsResolver, SongsService],
  imports: [SubscriptionModule],
  exports: [SongsService],
})
export class SongsModule {}
