'use client';

import React, { Suspense, useEffect } from 'react';

import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  GetAllClosingsDocument,
  useCreateClosingMutation,
  useGetAllClosingsQuery,
} from '@/generated/graphql';
import { Pagination } from '@/components/pagination';
import { usePagination } from '@/hooks/use-pagination';
import { FilterBase } from '@/components/filter-base';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { CreateClosingWithQuantityFormDialog } from './create-closing-with-quantity-form';
import { CreateClosingWithExternalIdFormDialog } from './create-closing-with-externalId-form';

type Props = {
  pageIndex: number;
  pageSize: number;
  filterFilter: string;
};

export function ClosingsTable({ pageIndex, pageSize, filterFilter }: Props) {
  const { data, refetch } = useGetAllClosingsQuery({
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
    total: data?.getTotalClosings,
    pageSize,
    showing: data?.closings.length,
  });

  const { toast } = useToast();
  const router = useRouter();

  const [createClosing] = useCreateClosingMutation({
    onCompleted: ({ createClosing: { id } }) => {
      refetch();
      toast({
        title: 'Fechamento criado com sucesso',
      });
      router.push(`/admin/closings/${id}/sales`);
    },
    onError: () => {
      toast({
        title: 'Erro ao criar fechamento',
      });
    },
    awaitRefetchQueries: true,
    refetchQueries: [GetAllClosingsDocument],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fechamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns({ refetch })}
          data={data?.closings || []}
          filterComponent={<FilterBase />}
          addComponent={
            <div className="space-x-4">
              <Button onClick={() => createClosing()}>Criar Fechamento</Button>
              <CreateClosingWithQuantityFormDialog />
              <CreateClosingWithExternalIdFormDialog />
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
