'use client';

import { ColumnDef } from '@tanstack/react-table';

import { tdb } from '@/components/TableDataButton';

import { GetAllPaymentsQuery } from '@/generated/graphql';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PaymentRequest = GetAllPaymentsQuery['payments'][0]['requests'][0];

export const columnsRequests: ColumnDef<PaymentRequest>[] = [
  tdb('data', 'data', `object`),

  tdb('createdAt', 'Cadastrado em', 'date-time'),
];
