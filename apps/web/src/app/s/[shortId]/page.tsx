import {
  GetSaleExternalIdWithShortIdDocument,
  GetSaleExternalIdWithShortIdQuery,
  UpdatePaymentStatusDocument,
  UpdatePaymentStatusMutation,
} from '@/generated/graphql';
import { client, clientGestao } from '@/services/apollo';
import { Metadata } from 'next';
import { unstable_noStore } from 'next/cache';

import { z } from 'zod';

import './styles.css';
import { format } from 'date-fns';
import {
  GetSaleWithExternalIdDocument,
  GetSaleWithExternalIdQuery,
} from '@/generated/graphql-gestao';
import { Extract } from './extract';

export const metadata: Metadata = {
  title: 'Fechamento',
};

const pageParams = z.object({
  params: z.object({
    shortId: z.string(),
  }),

  searchParams: z.object({
    response: z.enum(['success', 'pending', 'error']).optional(),
    status: z.enum(['approved', 'rejected', 'in_process', 'pending']).optional(), // z.string().optional(),
    collection_id: z.string().optional(),
    collection_status: z.string().optional(),
    payment_id: z.string().optional(),
    external_reference: z.string().optional(),
    payment_type: z.enum(['bank_transfer', 'credit_card', 'ticket', 'account_money']).optional(),
    merchant_order_id: z.string().optional(),
    preference_id: z.string().optional(),
    site_id: z.string().optional(),
    processing_mode: z.string().optional(),
    merchant_account_id: z.string().optional(),
  }),
});

export type PageParams = z.infer<typeof pageParams>;

const fDate = (da: string | null | Date) => {
  if (!da) return '';
  if (da === 'null') return '';
  const d = new Date(da);
  // d?.setDate(d.getDate() + 1);

  return d ? format(d, 'dd/MM/yyyy') : '';
};

export default async function UserPage(props: z.infer<typeof pageParams>) {
  unstable_noStore();

  const p = pageParams.safeParse(props);

  if (!p.success) {
    return <div>Invalid parameters</div>;
  }

  const {
    params: { shortId },
    searchParams: { response, ...responseData },
  } = p.data;

  try {
    const { data } = await client.query<GetSaleExternalIdWithShortIdQuery>({
      query: GetSaleExternalIdWithShortIdDocument,
      variables: { shortId },
    });

    const { data: dataExternal } = await clientGestao.query<GetSaleWithExternalIdQuery>({
      query: GetSaleWithExternalIdDocument,
      variables: { externalId: data.saleByShortId.externalId },
    });

    const { sale } = dataExternal;

    let message = '';

    if (response && data.saleByShortId.payments.length > 0) {
      const pendingPayment = data.saleByShortId.payments.find(
        payment => payment.status === 'PENDING',
      );

      if (pendingPayment) {
        await client.mutate<UpdatePaymentStatusMutation>({
          mutation: UpdatePaymentStatusDocument,
          variables: {
            input: {
              paymentId: pendingPayment?.id,
              status:
                responseData.status === 'approved'
                  ? 'CONFIRMED'
                  : responseData.status === 'rejected'
                    ? 'REJECTED'
                    : 'PENDING',
              method: responseData.payment_type,
              response: JSON.stringify(responseData),
              externalId: responseData.collection_id,
            },
          },
        });

        message = `Pagamento ${responseData.status} com sucesso`;
      }
    }

    return (
      <Extract
        {...{
          shortId,
          sale,
          searchParams: p.data.searchParams,
          message,
        }}
      />
    );
  } catch (error) {
    console.error(error);
    return JSON.stringify(error, null, 2);
  }
}
