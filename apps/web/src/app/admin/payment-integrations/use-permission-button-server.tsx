'use server';

import { AppAbilityCanBoolean, PolicyAppHandlerCallback } from '@/utils/app-ability';
import { ReactNode } from 'react';

export async function UsePermissionButtonServer(a: PolicyAppHandlerCallback) {
  return (children: ReactNode) => {
    const r = AppAbilityCanBoolean(a);

    if (r) {
      return children;
    }
    return null;
  };
}
