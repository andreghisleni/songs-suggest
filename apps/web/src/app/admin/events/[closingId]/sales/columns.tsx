'use client';

import { tdb } from '@/components/TableDataButton';

import { GetAllSalesFromClosingQuery } from '@/generated/graphql';
import { ReprocessButton } from './reprocess-button';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Sale = GetAllSalesFromClosingQuery['closing']['sales'][0];

export const columns = [
  tdb('code', 'ID'),
  tdb('clientName', 'Nome do cliente'),
  tdb('clientPhone', 'Telefone do cliente', 'phone'),
  tdb('status', 'Status'),
  tdb('createdAt', 'Criado em', 'date-time'),
  tdb('updatedAt', 'Atualizado em', 'date-time'),
  tdb('shortId', 'ID curto'),

  {
    header: 'Ações',
    accessorKey: 'id',
    cell: ({ row }) => (
      <>
        {row.original.status === 'ERROR_DURING_MESSAGE_SENDING' && (
          <ReprocessButton saleId={row.original.id} />
        )}
        <div />
      </>
    ),
  },
];
