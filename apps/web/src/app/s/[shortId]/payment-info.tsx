'use client';

import {
  GetSaleWithShortIdQuery,
  useCreatePaymentMutation,
  useGetAllPaymentIntegrationForSaleQuery,
} from '@/generated/graphql';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import MercadoPagoLogo from '@/assets/mercado-pago.png';
import SicrediLogo from '@/assets/sicredi.png';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

function getPaymentIntegrationLogo(paymentIntegrationType: string) {
  switch (paymentIntegrationType) {
    case 'MERCADO_PAGO':
      return MercadoPagoLogo;
    case 'SICREDI':
      return SicrediLogo;
    default:
      return '';
  }
}

function getPaymentMethodName(paymentMethod: string) {
  switch (paymentMethod) {
    case 'PIX':
      return 'Pix';
    case 'CREDIT_CARD':
      return 'Cartão de crédito';
    case 'BANK_BILLET':
      return 'Boleto';
    case 'DEBIT_CARD':
      return 'Cartão de débito';
    default:
      return '';
  }
}

type PaymentInfo = {
  saleId: string;
  diference: number;
  payments: GetSaleWithShortIdQuery['saleByShortId']['payments'];
};

export function PaymentInfo({ saleId, diference, payments }: PaymentInfo) {
  const { toast } = useToast();
  const router = useRouter();

  const paymentIntegrations = useGetAllPaymentIntegrationForSaleQuery();

  const [createPaymentHandler, { loading, data, ...createPayment }] = useCreatePaymentMutation({
    onCompleted: d => {
      toast({
        title: 'Pagamento criado com sucesso',
        description: 'Você será redirecionado para a página de pagamento',
      });
      if (d.createPayment.link) router.push(d.createPayment.link);
    },
    onError: error => {
      console.error('Error creating payment', error);
      toast({
        title: 'Erro ao criar pagamento',
        description: 'Não foi possível criar o pagamento',
        variant: 'destructive',
      });
    },
  });

  // console.log(createPayment);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Realizar novo pagamento</h1>
      <div>
        {paymentIntegrations.loading && <Loader className="h-24 w-24 animate-spin" />}
        {paymentIntegrations.data?.paymentIntegrations.map(paymentIntegration => (
          <div
            className="shadow-xs max-w-96 rounded-lg border border-zinc-200 bg-white text-zinc-950"
            key={paymentIntegration.id}
          >
            <CardHeader className="flex items-center">
              <Image
                src={getPaymentIntegrationLogo(paymentIntegration.type)}
                alt={paymentIntegration.type}
                className="w-48"
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <CardTitle className="text-xl">Métodos de pagamento aceitos:</CardTitle>
              <ul className="ml-8 list-disc">
                {paymentIntegration.paymentMethods.map(paymentMethod => (
                  <li key={paymentMethod}>{getPaymentMethodName(paymentMethod)}</li>
                ))}
              </ul>
              {/* <ShowJson data={data} /> */}
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="hover:cursor-pointer dark:bg-white"
                onClick={() => {
                  if (data?.createPayment.link) {
                    router.push(data.createPayment.link);
                  } else if (
                    payments.length > 0 &&
                    // payments[0].status === 'PENDING' &&
                    // payments[0].link
                    // any payment status === 'PENDING' and has a link
                    payments.some(payment => payment.status === 'PENDING' && payment.link)
                  ) {
                    router.push(payments.find(payment => payment.status === 'PENDING')?.link || '');
                  } else {
                    createPaymentHandler({
                      variables: {
                        input: {
                          saleId,
                          value: Math.abs(diference),
                          paymentIntegrationId: paymentIntegration.id,
                        },
                      },
                    });
                  }
                }}
              >
                {loading
                  ? 'Gerando link'
                  : data
                    ? 'Link gerado, redirecionar'
                    : payments.length > 0 &&
                        payments.some(payment => payment.status === 'PENDING' && payment.link)
                      ? 'Redirecionar para pagamento'
                      : 'Gerar link de pagamento'}
              </Button>
            </CardFooter>
          </div>
        ))}
      </div>
    </div>
  );
}
