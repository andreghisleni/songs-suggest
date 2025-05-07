import { Metadata } from 'next';

import { BasePageWithoutFilter } from '@/components/base-page';
import { ExportSaleExtract } from './export-sale-extract';

export const metadata: Metadata = {
  title: 'Sessões',
};

export default BasePageWithoutFilter(
  a => a.can('get', 'Sale'),
  () => {
    return <ExportSaleExtract />;
  },
);
