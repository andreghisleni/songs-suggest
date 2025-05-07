import { unstable_noStore } from 'next/cache';
import { ReactNode } from 'react';
import { z } from 'zod';
import { AppAbilityCan, PolicyAppHandlerCallback } from '@/utils/app-ability';
/* eslint react/display-name: 0 */

export const searchParams = z.object({
  pageIndex: z.coerce.number().default(0),
  pageSize: z.coerce.number().default(10),
  filterFilter: z.string().default(''),
});

const pageParams = z.object({
  searchParams,
});

export function BasePage<ExtraProps extends z.ZodTypeAny>(
  a: PolicyAppHandlerCallback,
  func: (p: z.infer<typeof pageParams> & z.infer<ExtraProps>) => ReactNode,
  extraProps?: ExtraProps,
) {
  return (props: z.infer<typeof pageParams> & z.infer<ExtraProps>) => {
    unstable_noStore();

    const r = AppAbilityCan(a);

    if (r) {
      return r;
    }

    const pS = extraProps ? pageParams.merge(extraProps as any) : pageParams;

    const p = pS.safeParse(props);

    if (!p.success) {
      return <div>Invalid parameters</div>;
    }

    return func(p.data as any);
  };
}

export function BasePageJustBaseFilter(
  a: PolicyAppHandlerCallback,
  func: (p: z.infer<typeof pageParams>) => ReactNode,
) {
  return (props: z.infer<typeof pageParams>) => {
    unstable_noStore();

    const r = AppAbilityCan(a);

    if (r) {
      return r;
    }

    const pS = pageParams;

    const p = pS.safeParse(props);

    if (!p.success) {
      return <div>Invalid parameters</div>;
    }

    return func(p.data as any);
  };
}

export function BasePageWithoutFilter<ExtraProps extends z.ZodTypeAny>(
  a: PolicyAppHandlerCallback,
  func: (p: z.infer<ExtraProps>) => ReactNode,
  extraProps?: ExtraProps,
) {
  return (props: z.infer<ExtraProps>) => {
    unstable_noStore();

    const r = AppAbilityCan(a);

    if (r) {
      return r;
    }

    if (!extraProps) {
      return func(props);
    }

    const pS = extraProps;

    const p = pS.safeParse(props);

    if (!p.success) {
      return <div>Invalid parameters</div>;
    }

    return func(p.data);
  };
}
export function BasePageWithoutFilterAndPermission<ExtraProps extends z.ZodTypeAny>(
  func: (p: z.infer<ExtraProps>) => ReactNode,
  extraProps: ExtraProps,
) {
  return (props: z.infer<ExtraProps>) => {
    unstable_noStore();

    const pS = extraProps;

    const p = pS.safeParse(props);

    if (!p.success) {
      return <div>Invalid parameters</div>;
    }

    return func(p.data);
  };
}
