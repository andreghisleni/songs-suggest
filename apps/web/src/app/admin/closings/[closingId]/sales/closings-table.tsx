'use client';

import React, { Suspense, useEffect } from 'react';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetAllSalesFromClosingQuery, useSaleUpdatedSubscription } from '@/generated/graphql';
import { Pagination } from '@/components/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { columns } from './columns';

type Props = {
  pageIndex: number;
  pageSize: number;
  filterFilter: string;
  closingId: string;
};

export function ClosingsTable({ closingId, pageIndex, pageSize, filterFilter }: Props) {
  // const pageIndex = 0;
  // const pageSize = 40000;
  // const filterFilter = undefined;
  const { data: initData, refetch } = useGetAllSalesFromClosingQuery({
    variables: {
      filter: {
        filter: filterFilter,
        page: pageIndex,
        limit: pageSize,
      },
      closingId,
    },
  });

  const { data: updateData, loading } = useSaleUpdatedSubscription({
    variables: {
      ids: initData?.closing.sales.map(sale => sale.id) || [],
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  const { totalPages, total, navigateToPage, setPageSize, showing } = usePagination({
    total: initData?.closing.totalSales,
    pageSize,
    showing: initData?.closing.sales.length,
  });

  const items = updateData?.saleUpdated
    ? [
        ...(initData?.closing.sales.filter(item => item.id !== updateData?.saleUpdated.id) || []),
        updateData.saleUpdated,
      ]
    : initData?.closing.sales || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fechamentos {loading ? 'true' : 'nao'}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={items || []}
          // filterComponent={<FilterBase />}
          // ifJustFilterComponent
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
