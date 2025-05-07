'use client';

import { ColumnDef } from '@tanstack/react-table';

import { tdb, tdbNew } from '@/components/TableDataButton';

import { GetAllPaymentsQuery } from '@/generated/graphql';
import { format } from 'date-fns';
import { columnsWebhooks } from './columns-webhooks';
import { columnsRequests } from './columns-requests';
import { UpdatePaymentReleasedDateButton } from './update-payment-released-date-button';
// import { PaymentFormDialog } from './payment-form-dialog';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = GetAllPaymentsQuery['payments'][0];

type ColumnsProps = {
  refetch: () => void;
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<Payment>[] => [
  tdb('sale.clientName', 'Nome do cliente'),

  tdb('sale.externalId', 'Id da venda'),

  tdb('externalId', 'Id do pagamento'),

  tdb('value', 'Valor', 'currency'),
  tdb('status', 'Status'),
  tdb('method', 'Método de pagamento'),

  // tdb('releasedAt', 'Lançado em', 'date-time'),
  // tdb('releasedBy.name', 'Lançado por'),

  tdbNew({
    id: 'releasedAt',
    name: 'releasedAt',
    label: 'Pagamento lançado',

    a: app => app.can('updateReleaseDate', 'Payment'),
    cell: ({ row }) => {
      if (row.original.releasedAt) {
        return (
          <div>
            <div>{format(row.original.releasedAt, 'dd/MM/yyyy HH:mm')}</div>
            <div>{row.original.releasedBy?.name}</div>
          </div>
        );
      }

      if (row.original.status !== 'CONFIRMED') {
        return <div className="text-red-500">Pagamento não confirmado</div>;
      }

      return <UpdatePaymentReleasedDateButton refetch={refetch} id={row.original.id} />;
    },
  }),

  tdb('createdAt', 'Cadastrado em', 'date-time'),

  tdbNew({
    name: 'webhooks',
    label: 'Webhooks',
    dataType: 'table',
    columns: columnsWebhooks as any,
  }),
  tdbNew({
    name: 'requests',
    label: 'Requests',
    dataType: 'table',
    columns: columnsRequests as any,
  }),

  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const {
  //       ability: { app },
  //     } = useAuth();
  //     return (
  //       <div className="flex gap-2">
  //         {app && app.can('update', 'Payment') && (
  //           <PaymentFormDialog refetch={refetch} payment={row.original} />
  //         )}
  //       </div>
  //     );
  //   },
  // },
];
