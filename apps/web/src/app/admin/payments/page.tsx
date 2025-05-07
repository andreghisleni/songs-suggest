import { Metadata } from 'next';

import { BasePage, searchParams } from '@/components/base-page';
import { z } from 'zod';
import { PaymentsTable } from './payments-table';
import { filterSchema } from './filter-schema';

export const metadata: Metadata = {
  title: 'Pagamentos',
};

export default BasePage(
  a => a.can('get', 'Payment'),
  ({ searchParams: { filterFilter, pageIndex, pageSize, statusFilter } }) => {
    return <PaymentsTable {...{ filterFilter, pageIndex, pageSize, statusFilter }} />;
  },
  z.object({
    searchParams: searchParams.merge(filterSchema),
  }),
);
