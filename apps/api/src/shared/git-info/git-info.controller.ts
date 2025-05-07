import { Controller, Get } from '@nestjs/common';
import gitCommitInfo from 'git-commit-info';

import { Public } from '../auth/public.decorator';
import { EnvService } from '../env/env.service';

@Controller('git-info')
export class GitInfoController {
  constructor(private readonly env: EnvService) {}

  @Public()
  @Get('?')
  async getGitInfo() {
    const gitInfo = gitCommitInfo({
      commit: this.env.get('SOURCE_COMMIT'),
    });

    return gitInfo;
  }
  @Public()
  @Get('/teste')
  async getTeste() {
    return 'teste';
  }
}
