import { Metadata } from 'next';

import { BasePageJustBaseFilter } from '@/components/base-page';
import { PaymentIntegrationsTable } from './payment-integrations-table';

export const metadata: Metadata = {
  title: 'Integrações de pagamento',
};

export default BasePageJustBaseFilter(
  a => a.can('get', 'PaymentIntegration'),
  ({ searchParams: { filterFilter, pageIndex, pageSize } }) => {
    return <PaymentIntegrationsTable {...{ filterFilter, pageIndex, pageSize }} />;
  },
);
