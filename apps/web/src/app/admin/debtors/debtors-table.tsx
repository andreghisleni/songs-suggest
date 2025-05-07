'use client';

import React, { Suspense, useEffect } from 'react';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useGetAllDebtorsQuery } from '@/generated/graphql';
import { Pagination } from '@/components/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { FilterBase } from '@/components/filter-base';
import { columns } from './columns';
import { CreateDebtorFormDialog } from './create-debtor-form';

type Props = {
  pageIndex: number;
  pageSize: number;
  filterFilter: string;
};

export function DebtorsTable({ pageIndex, pageSize, filterFilter }: Props) {
  const { data, refetch } = useGetAllDebtorsQuery({
    variables: {
      filter: {
        filter: filterFilter,
        page: pageIndex,
        limit: pageSize,
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  const { totalPages, total, navigateToPage, setPageSize, showing } = usePagination({
    total: data?.getTotalDebtors,
    pageSize,
    showing: data?.debtors.length,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cobranças</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.debtors || []}
          filterComponent={<FilterBase />}
          addComponent={
            <div className="space-x-4">
              <CreateDebtorFormDialog />
            </div>
          }
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
