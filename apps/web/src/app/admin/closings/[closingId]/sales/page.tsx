import { Metadata } from 'next';

import { BasePage } from '@/components/base-page';
import { z } from 'zod';
import { ClosingsTable } from './closings-table';

export const metadata: Metadata = {
  title: 'Sessões',
};

export default BasePage(
  a => a.can('get-all', 'Closing'),
  ({ searchParams: { filterFilter, pageIndex, pageSize }, params: { closingId } }) => {
    return <ClosingsTable {...{ filterFilter, pageIndex, pageSize, closingId }} />;
  },
  z.object({
    params: z.object({
      closingId: z.string(),
    }),
  }),
);
