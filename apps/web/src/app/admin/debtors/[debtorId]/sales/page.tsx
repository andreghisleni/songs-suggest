import { Metadata } from 'next';

import { BasePage } from '@/components/base-page';
import { z } from 'zod';
import { SalesTable } from './sales-table';

export const metadata: Metadata = {
  title: 'Cobranças',
};

export default BasePage(
  a => a.can('get-all', 'Debtor'),
  ({ searchParams: { filterFilter, pageIndex, pageSize }, params: { debtorId } }) => {
    return <SalesTable {...{ filterFilter, pageIndex, pageSize, debtorId }} />;
  },
  z.object({
    params: z.object({
      debtorId: z.string(),
    }),
  }),
);
