import { Metadata } from 'next';

import { BasePageJustBaseFilter } from '@/components/base-page';
import { DebtorsTable } from './debtors-table';

export const metadata: Metadata = {
  title: 'Devedores',
};

export default BasePageJustBaseFilter(
  a => a.can('get-all', 'Debtor'),
  ({ searchParams: { filterFilter, pageIndex, pageSize } }) => {
    return <DebtorsTable {...{ filterFilter, pageIndex, pageSize }} />;
  },
);
