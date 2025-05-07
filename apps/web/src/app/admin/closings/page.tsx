import { Metadata } from 'next';

import { BasePageJustBaseFilter } from '@/components/base-page';
import { ClosingsTable } from './closings-table';

export const metadata: Metadata = {
  title: 'Sessões',
};

export default BasePageJustBaseFilter(
  a => a.can('get-all', 'Closing'),
  ({ searchParams: { filterFilter, pageIndex, pageSize } }) => {
    return <ClosingsTable {...{ filterFilter, pageIndex, pageSize }} />;
  },
);
