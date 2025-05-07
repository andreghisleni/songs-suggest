import { Module } from '@nestjs/common';

import { GitInfoController } from './git-info.controller';

@Module({
  imports: [],

  controllers: [GitInfoController],
})
export class GitInfoModule {}
