'use client';

import { ColumnDef } from '@tanstack/react-table';

import { tdb } from '@/components/TableDataButton';

import { GetAllDebtorsQuery } from '@/generated/graphql';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Debtor = GetAllDebtorsQuery['debtors'][0];

type ColumnsProps = {
  refetch: () => void;
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Debtor>[] => [
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
          <Link href={`debtors/${row.original.id}/sales`}>Abrir</Link>
        </Button>
        {/* <ReRunButton debtorId={row.original.id} /> */}
      </>
    ),
  },
];
