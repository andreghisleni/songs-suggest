import { application } from '@full-stack/authorization';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CaslAbilityFactory {
  createForUserApp(user: application.User) {
    return application.defineAbilityFor(user);
  }
}
