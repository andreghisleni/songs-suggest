'use client';

import React, { Suspense } from 'react';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  useGetAllSalesFromDebtorQuery,
  useSaleFromDebtorUpdatedSubscription,
} from '@/generated/graphql';
import { Pagination } from '@/components/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { columns } from './columns';
import { ProcessDebtorsButton } from './process-debtors-button';

type Props = {
  pageIndex: number;
  pageSize: number;
  filterFilter: string;
  debtorId: string;
};

export function SalesTable({ debtorId, pageIndex, pageSize, filterFilter }: Props) {
  // const pageIndex = 0;
  // const pageSize = 40000;
  // const filterFilter = undefined;
  const { data: initData, refetch } = useGetAllSalesFromDebtorQuery({
    variables: {
      filter: {
        filter: filterFilter,
        page: pageIndex,
        limit: pageSize,
      },
      debtorId,
    },
  });

  const { data: updateData, loading } = useSaleFromDebtorUpdatedSubscription({
    variables: {
      ids: initData?.debtor.sales.map(sale => sale.id) || [],
    },
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetch();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [refetch]);

  const { totalPages, total, navigateToPage, setPageSize, showing } = usePagination({
    total: initData?.debtor.totalSales,
    pageSize,
    showing: initData?.debtor.sales.length,
  });

  const items = (
    updateData?.debtorSaleUpdated
      ? [
          ...(initData?.debtor.sales.filter(item => item.id !== updateData?.debtorSaleUpdated.id) ||
            []),
          updateData.debtorSaleUpdated,
        ]
      : initData?.debtor.sales || []
  ).map(item => ({
    ...item,
    total: item.totalValue - item.totalReceived,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cobranças {loading ? 'true' : 'nao'}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={items || []}
          // filterComponent={<FilterBase />}
          // ifJustFilterComponent
          addComponent={
            initData?.debtor.status === 'DATA_FETCHED' && <ProcessDebtorsButton id={debtorId} />
          }
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
