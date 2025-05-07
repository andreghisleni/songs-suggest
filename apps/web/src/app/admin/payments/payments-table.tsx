'use client';

import React, { Suspense } from 'react';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetAllPaymentsQuery } from '@/generated/graphql';
import { Pagination } from '@/components/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { useAuth } from '@/hooks/auth';
import { FilterBaseNew } from '@/components/filter-base-new';
import { columns } from './columns';
import { filterSchema } from './filter-schema';
// import { PaymentFormDialog } from './payment-form-dialog';

type Props = {
  pageIndex: number;
  pageSize: number;
  filterFilter: string;
  statusFilter: string;
};

export function PaymentsTable({ pageIndex, pageSize, filterFilter, statusFilter }: Props) {
  const {
    ability: { app },
  } = useAuth();
  const { data, refetch } = useGetAllPaymentsQuery({
    variables: {
      filter: {
        filter: filterFilter,
        page: pageIndex,
        limit: pageSize,
        status: statusFilter === 'ALL' ? undefined : statusFilter,
      },
    },
  });

  const { totalPages, total, navigateToPage, setPageSize, showing } = usePagination({
    total: data?.getTotalPayments,
    pageSize,
    showing: data?.payments.length,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrações de pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <ShowJson
          data={{
            items: total,
            page: pageIndex,
            pages: totalPages,
            limit: pageSize,
            showing,
          }}
        /> */}
        <DataTable
          columns={columns({ refetch })}
          data={data?.payments || []}
          // addComponent={
          //   app && app.can('create', 'Payment') ? <PaymentFormDialog refetch={refetch} /> : null
          // }
          filterComponent={<FilterBaseNew additionalFieldsSchema={filterSchema} />}
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
