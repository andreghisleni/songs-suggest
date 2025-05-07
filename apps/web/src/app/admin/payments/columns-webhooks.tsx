'use client';

import { ColumnDef } from '@tanstack/react-table';

import { tdb } from '@/components/TableDataButton';

import { GetAllPaymentsQuery } from '@/generated/graphql';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PaymentWebhook = GetAllPaymentsQuery['payments'][0]['webhooks'][0];

export const columnsWebhooks: ColumnDef<PaymentWebhook>[] = [
  // tdb('data', 'data', ``),
  tdb('data', 'data', `object`),

  tdb('createdAt', 'Cadastrado em', 'date-time'),
];
