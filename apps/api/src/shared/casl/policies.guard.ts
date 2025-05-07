import { Session } from '@/modules/sessions/entities/session.entity';
import { User } from '@/modules/users/entities/user.entity';
import { application } from '@full-stack/authorization';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_APP_KEY, PolicyAppHandler } from './policies.types';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const policyAppHandlers =
      this.reflector.get<PolicyAppHandler[]>(CHECK_POLICIES_APP_KEY, context.getHandler()) || [];

    if (policyAppHandlers.length === 0) {
      throw new Error('No policies defined');
    }

    const ctx = GqlExecutionContext.create(context);
    const {
      user: { id, role: userRole },
    } = ctx.getContext<{ req: { user: Session & { user: User } } }>().req.user;

    if (!id) {
      throw new ForbiddenException('You are not allowed to perform this action');
    }

    if (policyAppHandlers.length > 0) {
      if (!userRole) throw new ForbiddenException('You are not allowed to perform this action');

      const ability = this.caslAbilityFactory.createForUserApp({ id, role: userRole });

      return policyAppHandlers.every(handler => {
        const result = this.execPolicyAppHandler(handler, ability);

        if (!result) {
          throw new ForbiddenException('You are not allowed to perform this action');
        }

        return result;
      });
    }
    throw new Error('No policies defined');
  }

  private execPolicyAppHandler(handler: PolicyAppHandler, ability: application.AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
