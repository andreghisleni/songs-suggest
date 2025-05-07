'use client';

import React, { Suspense } from 'react';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetAllPaymentIntegrationsQuery } from '@/generated/graphql';
import { Pagination } from '@/components/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { FilterBase } from '@/components/filter-base';
import { useAuth } from '@/hooks/auth';
import { columns } from './columns';
import { PaymentIntegrationFormDialog } from './payment-integration-form-dialog';

type Props = {
  pageIndex: number;
  pageSize: number;
  filterFilter: string;
};

export function PaymentIntegrationsTable({ pageIndex, pageSize, filterFilter }: Props) {
  const {
    ability: { app },
  } = useAuth();
  const { data, refetch } = useGetAllPaymentIntegrationsQuery({
    variables: {
      filter: {
        filter: filterFilter,
        page: pageIndex,
        limit: pageSize,
      },
    },
  });

  const { totalPages, total, navigateToPage, setPageSize, showing } = usePagination({
    total: data?.getTotalPaymentIntegrations,
    pageSize,
    showing: data?.paymentIntegrations.length,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrações de pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.paymentIntegrations || []}
          addComponent={
            app && app.can('create', 'PaymentIntegration') ? (
              <PaymentIntegrationFormDialog refetch={refetch} />
            ) : null
          }
          filterComponent={<FilterBase />}
          ifJustFilterComponent
          paginationComponent={
            <Suspense fallback={null}>
              <Pagination
                {...{
                  items: total,
                  page: pageIndex,
                  pages: totalPages,
                  limit: pageSize,
                  showing,
                  handleUpdatePage: p => {
                    navigateToPage(p);
                  },
                  handleChangeLimit: l => {
                    setPageSize(`${l}`);
                  },
                }}
              />
            </Suspense>
          }
        />
      </CardContent>
    </Card>
  );
}
