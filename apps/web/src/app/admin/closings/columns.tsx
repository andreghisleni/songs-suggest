'use client';

import { ColumnDef } from '@tanstack/react-table';

import { tdb } from '@/components/TableDataButton';

import { GetAllClosingsQuery } from '@/generated/graphql';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReRunWithErrorButton } from './re-run-with-error-button-copy';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Closing = GetAllClosingsQuery['closings'][0];

type ColumnsProps = {
  refetch: () => void;
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Closing>[] => [
  tdb('totalDebits', 'Total Devedores'),
  tdb('totalSent', 'Total Enviados'),
  tdb('status', 'Status'),
  tdb('createdAt', 'Criado em', 'date-time'),
  tdb('updatedAt', 'Atualizado em', 'date-time'),

  {
    header: 'Ações',
    accessor: 'id',
    cell: ({ row }) => (
      <>
        <Button asChild>
          <Link href={`closings/${row.original.id}/sales`}>Abrir</Link>
        </Button>
        <ReRunWithErrorButton closingId={row.original.id} />
      </>
    ),
  },
];
