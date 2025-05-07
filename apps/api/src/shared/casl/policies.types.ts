import { application } from '@full-stack/authorization';
import { SetMetadata } from '@nestjs/common';

interface IPolicyAppHandler {
  handle(ability: application.AppAbility): boolean;
}

type PolicyAppHandlerCallback = (ability: application.AppAbility) => boolean;

export type PolicyAppHandler = IPolicyAppHandler | PolicyAppHandlerCallback;

export const CHECK_POLICIES_APP_KEY = 'check_policy_app';
export const CheckPoliciesApp = (...handlers: PolicyAppHandler[]) =>
  SetMetadata(CHECK_POLICIES_APP_KEY, handlers);
