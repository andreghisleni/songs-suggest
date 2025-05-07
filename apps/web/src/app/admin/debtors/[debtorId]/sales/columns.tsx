'use client';

import { ColumnDef } from '@tanstack/react-table';

import { tdb } from '@/components/TableDataButton';

import { GetAllSalesFromDebtorQuery } from '@/generated/graphql';
import { ReprocessButton } from './reprocess-button';
import { DeleteSaleDebtorButton } from './delete-sale-debtor-button';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Sale = GetAllSalesFromDebtorQuery['debtor']['sales'][0] & {
  total: number;
};

export const columns: ColumnDef<Sale>[] = [
  tdb('externalId', 'ID'),
  tdb('clientName', 'Nome do cliente'),
  tdb('clientPhone', 'Telefone do cliente', 'phone'),
  tdb('date', 'Data', 'date'),
  tdb('totalValue', 'Valor total', 'currency'),
  tdb('totalReceived', 'Valor recebido', 'currency'),
  // tdbNew({
  //   id: 'total',
  //   label: 'Valor restante',
  //   cell: ({ row }) => {
  //     const { totalValue } = row.original;
  //     const { totalReceived } = row.original;
  //     return formatToBRL(totalValue - totalReceived);
  //   },
  //   dataType: 'currency',
  // }),
  tdb('total', 'Valor restante', 'currency'),
  tdb('status', 'Status'),
  // tdb('createdAt', 'Criado em', 'date-time'),
  // tdb('updatedAt', 'Atualizado em', 'date-time'),

  {
    header: 'Ações',
    accessorKey: 'id',
    cell: ({ row }) => (
      <>
        {row.original.status === 'ERROR_DURING_MESSAGE_SENDING' && (
          <ReprocessButton saleId={row.original.id} />
        )}
        {row.original.status === 'PENDING' && <DeleteSaleDebtorButton sale={row.original} />}
      </>
    ),
  },
];
