'use client';

import { ColumnDef } from '@tanstack/react-table';

import { tdb, tdbNew } from '@/components/TableDataButton';

import { GetAllPaymentIntegrationsQuery } from '@/generated/graphql';
import { PaymentIntegrationFormDialog } from './payment-integration-form-dialog';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PaymentIntegration = GetAllPaymentIntegrationsQuery['paymentIntegrations'][0];

type ColumnsProps = {
  refetch: () => void;
};

export const columns = ({ refetch }: ColumnsProps): ColumnDef<PaymentIntegration>[] => [
  tdb('name', 'Nome'),

  tdb('type', 'Tipo'),

  tdb('paymentMethods', 'Métodos de pagamento', 'array'),

  tdb('createdAt', 'Cadastrado em', 'date-time'),

  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const {
  //       ability: { app },
  //     } = useAuth();
  //     return (
  //       <div className="flex gap-2">
  //         {app && app.can('update', 'PaymentIntegration') && (
  //           <PaymentIntegrationFormDialog refetch={refetch} paymentIntegration={row.original} />
  //         )}
  //       </div>
  //     );
  //   },
  // },

  tdbNew({
    id: 'actions',
    enableHiding: false,

    a: app => app.can('update', 'PaymentIntegration'),
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <PaymentIntegrationFormDialog refetch={refetch} paymentIntegration={row.original} />
        </div>
      );
    },
  }),
];
